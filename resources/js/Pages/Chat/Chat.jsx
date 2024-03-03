import ChatInput from "@/Components/Chat/ChatInput";
import ChatMessages from "@/Components/Chat/ChatMessages";
import ChatSidebar from "@/Components/Chat/ChatSidebar";
import ChatUserInfoHeader from "@/Components/Chat/ChatUserInfoHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import classNames from "classnames";
import { useEffect, useState, useRef, useCallback } from "react";
import { appURL } from "@/services";
import { browserName } from "react-device-detect";

export default function Chat({ auth, errors, receiver: companion = {} }) {
    const [currentView, setCurrentView] = useState('showSidebar')
    const [receiver, setReceiver] = useState({})
    const [isMobileView, setIsMobileView] = useState(false)
    const [chats, setChats] = useState([])
    const [nextPageUrl, setNextPageUrl] = useState('')
    const [preloader, setPreloader] = useState(false)
    const [readedMesages, setReadedMessages] = useState(false)

    const [nextPageMessagesUrl, setNextPageMessagesUrl] = useState('')
    const [messages, setMessages] = useState([])

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

    const hideSidebar = useCallback(() => {
        setCurrentView('hideSidebar')
    }, [])

    const showSidebar = useCallback(() => {
        setCurrentView('showSidebar')
        setReceiver(null)
        setIsLoading(false)
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
        })

        if (savedMessages.length) {
            setSavedMessages(prevSavedMeassages => {
                return prevSavedMeassages.map(el => {
                    if (el.id === json.message.sender_id) {
                        if (!el.messages.some(el => el.id === json.message.id)) {

                            el.messages.push(json.message)
                        }
                    }
                    return el
                }
                )
            })
        }
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
            setMessages([...reversedMessages])
            saveMessagesOfReceiver([...reversedMessages], recId, json.next_page_url)
            // setPreloader(false)
        } else {
            setMessages(prevMessages => [...reversedMessages, ...prevMessages])
            const savedMessagesOfReceiver = savedMessages.find(el => el.id === recId)
            saveMessagesOfReceiver([...reversedMessages, ...savedMessagesOfReceiver.messages], recId, json.next_page_url)
        }
    }

    function saveMessagesOfReceiver(messagesReceiver, recId, nextPageUrl = null) {
        if (!recId) {
            return
        }

        const index = savedMessages.indexOf(savedMessages.find(el => el.id === recId))

        if (index !== -1) {
            savedMessages[index].messages = messagesReceiver
            savedMessages[index].nextPageUrl = nextPageUrl
        } else {
            savedMessages.push({ id: recId, messages: messagesReceiver, nextPageUrl: nextPageUrl })
        }

        setSavedMessages(savedMessages)
    }

    const scrollDown = () => {
        setTimeout(() => {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
            initialMessagesLoaded.current = false
        }, 0)
    }

    useEffect(() => {
        if (isLoading) {
            setIsLoading(false)
        }

        if (preloader) {
            setPreloader(false)
        }

        if (initialMessagesLoaded.current) {
            scrollDown()
        }
    }, [messages])

    useEffect(() => {
        const windowWidth = window.innerWidth

        if (windowWidth <= 768 && !isMobileView) {
            setIsMobileView(true)

            if (!receiver?.id) {
                showSidebar()
            } else {
                hideSidebar()
            }
        } else if (isMobileView) {

            if (!receiver?.id) {
                showSidebar()
                document.body.style.overflow = 'auto'
                // document.body.style.height = 'auto'
                // document.querySelector('#app').style.height = 'auto'
            } else {
                hideSidebar()
                document.body.style.overflow = 'hidden'
                // document.body.style.height = 'calc(100vh - 56px)'
                // document.querySelector('#app').style.height = '100%'
            }
        }
    }, [receiver])

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
            document.body.style.overflow = 'auto'
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

    const setMassegesAsReadedRequest = async (senderId) => {
        await fetch(`${appURL}/chat/setReaded/${senderId}`)
    }

    useEffect(() => {
        if (receiver?.id) {
            initialMessagesLoaded.current = true

            const savedReceivermessages = savedMessages.find(el => el.id === receiver.id)

            if (savedReceivermessages) {
                setMessages(savedReceivermessages.messages)

                if (savedReceivermessages.messages.find((el) => el.status === 0)) {
                    setMassegesAsReadedRequest(receiver.id)
                }

                setNextPageMessagesUrl(savedReceivermessages.nextPageUrl)
            } else {
                setPreloader(true)

                setTimeout(() => getChatMessages(`${appURL}/chat/messages/${receiver.id}`, true), 100)
            }

        }
    }, [receiver])

    const handleReadedMessage = () => {
        setReadedMessages(true);
    }

    const getLastMessage = useCallback(async () => {
        if (!receiver.id) {
            return
        }
        const resp = await fetch(`${appURL}/chat/lastMessage/${receiver.id}`)
        const json = await resp.json()

        setMessages(prevMessages => [...prevMessages, JSON.parse(JSON.stringify(json))])

        setSavedMessages(prevSavedMessages => {
            return prevSavedMessages.map(el => {
                if (el.id === receiver.id) {
                    if (!el.messages.some(el => el.id === json.id)) {
                        el.messages.push(JSON.parse(JSON.stringify(json)))
                    }
                }
                return el
            }
            )
        })

        scrollDown()
    }, [receiver])

    const sidebarClasses = classNames({
        "border-r border-slate-100 bg-white pt-3 h-[100vh] whitespace-nowrap pb-[58px] md:pb-0": true,
        "hidden": currentView === 'hideSidebar' && isMobileView,
        "w-full": currentView === 'showSidebar',
        "basis-[30%]": !isMobileView
    })

    const chatWindowClasses = classNames({
        "relative h-full flex flex-col md:py-1 w-full bg-gradient-to-tl from-amber-100 from-5% via-emerald-300  to-amber-100 to-95%": true,
        "hidden": currentView === 'showSidebar' && isMobileView,
    })

    // const mobileChatHeight = browserName === 'Chrome' ? 'h-[86vh]' : 'h-[73vh]'
    
    return (
        <AuthenticatedLayout auth={auth} errors={errors} zIndex={receiver?.id ? "z-[12]" : ""}>
            <div className="messanger h-full">
                <div className="flex h-full">
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
                    {receiver?.id &&
                        <div className="flex fixed top-0 left-0 right-0 items-center pl-[13px] md:mx-0 py-[2px] bg-white z-[12] md:relative md:bg-transparent">
                            {
                                isMobileView && <div className="mr-5 cursor-pointer" onClick={showSidebar}>
                                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                                </div>
                            }

                            <ChatUserInfoHeader receiver={receiver} />
                        </div>
                    }

                        <div className="pl-[10px] pr-[5px] pt-[35px] md:pt-0">
                            {receiver?.id ? (
                                <>
                                    {/* height */}
                                    <div className={"chat-messages flex flex-1 md:flex-none flex-col md:h-chat h-mobile-chat-height"}>
                                        <ChatMessages
                                            readedMesages={readedMesages}
                                            setMessages={setMessages}
                                            setSavedMessages={setSavedMessages}
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
                                    </div>

                                    <div className="shrink-0 md:relative fixed bottom-0 left-0 right-0 max-w-xl pl-[5px] w-full mx-auto z-[102]">
                                        <ChatInput receiver={receiver} getLastChat={getLastChat} />
                                    </div>
                                </>
                            ) : (
                                <div className="flex left-0 justify-center items-center bg-transparent h-screen">
                                    <p className="text-2xl text-zinc-500 font-serif">
                                        Select a user to start chatting
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}