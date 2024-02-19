import ChatInput from "@/Components/Chat/ChatInput";
import ChatMessages from "@/Components/Chat/ChatMessages";
import ChatSidebar from "@/Components/Chat/ChatSidebar";
import ChatUserInfoHeader from "@/Components/Chat/ChatUserInfoHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import classNames from "classnames";
import { useEffect, useState, useRef, useCallback } from "react";
import { appURL } from "@/services";

export default function Chat({ auth, errors, receiver: companion = null }) {
    const [currentView, setCurrentView] = useState('showSidebar')
    const [receiver, setReceiver] = useState({})
    const [isMobileView, setIsMobileView] = useState(false)
    const [chats, setChats] = useState([])
    const [nextPageUrl, setNextPageUrl] = useState('')
    const [preloader, setPreloader] = useState(false)
    const [readedMesages, setReadedMessages] = useState(false)

    const [nextPageMessagesUrl, setNextPageMessagesUrl] = useState('')
    const [messages, setMessages] = useState([])

    const [prevScrollHeight, setPrevScrollHeight] = useState(null)
    const initialMessagesLoaded = useRef(false);
    const [isLoading, setIsLoading] = useState(false);

    const scrollRef = useRef(null)

    const [savedMessages, setSavedMessages] = useState([])

    const setReceiverHandler = (messagesReceiver) => {
        if (receiver === messagesReceiver) {
            return
        }

        if (!isLoading) {
            setIsLoading(true)
            setReceiver(messagesReceiver)
        }
    }

    useEffect(() => {
        setIsLoading(false)
        setPreloader(false)

        if (initialMessagesLoaded.current) {
            setTimeout(() => {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight
                initialMessagesLoaded.current = false
            }, 50)
        }
    }, [messages])

    useEffect(() => {
        if (prevScrollHeight) {
            const scrollDifference = scrollRef.current.scrollHeight - prevScrollHeight
            scrollRef.current.scrollTop += scrollDifference
        }
    }, [prevScrollHeight])

    const hideSidebar = useCallback(() => {
        setCurrentView('hideSidebar')
    }, [])

    const showSidebar = useCallback(() => {
        setCurrentView('showSidebar')
        setReceiverHandler(null)
    }, [])

    const getChats = async (url) => {
        const resp = await fetch(url)
        const json = await resp.json()

        setNextPageUrl(json.next_page_url)
        setChats([...chats, ...json.data])
    }

    const getLastChat = useCallback(async (userId) => {
        const resp = await fetch(`${appURL}/chat/lastChat/${userId}`)
        const json = await resp.json()

        setChats(prevChats => {
            const newChats = prevChats.filter(chat => json.user.id !== chat.user.id)
            return [json, ...newChats]
        }
        )
    }, [receiver])

    const getUpdatedChats = useCallback(async () => {
        const resp = await fetch(`${appURL}/chatList?limit=${chats.length}`)
        const json = await resp.json()

        setChats(json)
    }, [chats])

    const getChatMessages = async (url, firstInit = false) => {
        const resp = await fetch(url)
        const json = await resp.json()
        const recId = receiver.id

        setNextPageMessagesUrl(json.next_page_url)

        const reversedMessages = json.data.reverse()

        if (firstInit) {
            setMessages(reversedMessages)
            saveMessagesOfReceiver(reversedMessages, recId, json.next_page_url)
            // setPreloader(false)
        } else {
            setMessages(prevMessages => [...reversedMessages, ...prevMessages])
            saveMessagesOfReceiver([...reversedMessages, ...messages], recId, json.next_page_url)

            setPrevScrollHeight(scrollRef.current.scrollHeight)
        }
    }

    function saveMessagesOfReceiver(messages, recId, nextPageUrl) {
        if (!recId) {
            return
        }

        const index = savedMessages.indexOf(savedMessages.find(el => el.id === recId))

        if (index !== -1) {
            savedMessages[index].messages = messages
            savedMessages[index].nextPageUrl = nextPageUrl
        } else {
            savedMessages.push({ id: recId, messages: messages, nextPageUrl: nextPageUrl })
        }
        setSavedMessages(savedMessages)
    }

    useEffect(() => {
        getChats(`${appURL}/chatList`)

        if (companion) {
            setReceiver(companion)
        }

        Echo.private(`chatmessages.${auth.user.id}`)
            .listen('ChatMessageSent', (e) => {
                getLastChat(e.user_id)
            })

        return () => {
            Echo.leave(`chatmessages.${auth.user.id}`)
        }
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            getUpdatedChats()
        }, 180000);

        return () => {
            clearInterval(intervalId)
        }
    }, [chats])

    useEffect(() => {
        if (receiver?.id) {
            initialMessagesLoaded.current = true

            const savedReceivermessages = savedMessages.find(el => el.id === receiver.id)

            if (savedReceivermessages) {
                setMessages(savedReceivermessages.messages)
                setNextPageMessagesUrl(savedReceivermessages.nextPageUrl)
            } else {
                setPreloader(true)

                setTimeout(() => getChatMessages(`${appURL}/chat/messages/${receiver.id}`, true), 100)
            }

        }
    }, [receiver])

    useEffect(() => {
        const windowWidth = window.innerWidth

        if (windowWidth <= 768) {
            setIsMobileView(true)

            if (!receiver) {
                showSidebar()
            }

            if (receiver) {
                hideSidebar()
            }
        }
    }, [receiver])

    const handleReadedMessage = useCallback((e) => {
        setReadedMessages(true);
    }, [])

    const getLastMessage = useCallback(async () => {
        if (!receiver.id) {
            return
        }
        const resp = await fetch(`${appURL}/chat/lastMessage/${receiver.id}`)
        const json = await resp.json()

        handleReadedMessage()

        setMessages(prevMessages => [...prevMessages, json])
    }, [receiver])

    const sidebarClasses = classNames({
        "border-r border-slate-100 bg-white pt-3 h-[100vh]": true,
        "hidden": currentView === 'hideSidebar' && isMobileView,
        "w-full": currentView === 'showSidebar',
        "basis-2/6": !isMobileView
    })

    const chatWindowClasses = classNames({
        "relative p-4 w-full h-screen": true,
        "basis-4/6": !isMobileView,
        "hidden": currentView === 'showSidebar' && isMobileView,
    })

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <div className="messanger">
                <div className="flex h-screen">
                    <div className={sidebarClasses}>
                        <ChatSidebar
                            setReceiverHandler={setReceiverHandler}
                            auth_id={auth.user.id}
                            nextPageUrl={nextPageUrl}
                            chats={chats}
                            getChats={getChats}
                        />
                    </div>

                    <div className={chatWindowClasses}>
                        {receiver.id ? (
                            <>
                                <div className="flex items-center">
                                    {
                                        isMobileView && <div className="mr-5 cursor-pointer" onClick={showSidebar}>
                                            <i class="fa fa-arrow-left" aria-hidden="true"></i>
                                        </div>
                                    }

                                    <ChatUserInfoHeader receiver={receiver} />
                                </div>

                                <div className="messanger mt-4 h-[93%]">
                                    <div className="flex flex-col h-full relative" style={{ maxHeight: 'calc(100vh - 82px)' }}>
                                        <ChatMessages
                                            readedMesages={readedMesages}
                                            handleReadedMessage={handleReadedMessage}
                                            preloader={preloader}
                                            getChatMessages={getChatMessages}
                                            messages={messages}
                                            receiver={receiver}
                                            auth_id={auth.user.id}
                                            nextPageUrl={nextPageMessagesUrl}
                                            getLastMessage={getLastMessage}
                                            ref={scrollRef}
                                        />

                                        <div>
                                            <ChatInput receiver={receiver} getLastChat={getLastChat} />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-center items-center bg-slate-100 h-screen">
                                <p className="font-bold text-3xl text-gray-500">
                                    Please select a User to start
                                    chatting...
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}