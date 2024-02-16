import ChatInput from "@/Components/Chat/ChatInput";
import ChatMessages from "@/Components/Chat/ChatMessages";
import ChatSidebar from "@/Components/Chat/ChatSidebar";
import ChatUserInfoHeader from "@/Components/Chat/ChatUserInfoHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import classNames from "classnames";
import { memo, useCallback, useEffect, useState } from "react";
import { appURL } from "@/services";

export default function Chat({ auth, errors, receiver: companion = null }) {
    const [currentView, setCurrentView] = useState('showSidebar')
    const [receiver, setReceiver] = useState(null)
    const [isMobileView, setIsMobileView] = useState(false)
    const [chats, setChats] = useState([])
    const [nextPageUrl, setNextPageUrl] = useState('')

    const setReceiverHandler = useCallback((receiver) => {
        setReceiver(receiver)
    }, [])

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

    const getLastChat = useCallback( async(userId) => {
        const resp = await fetch(`${appURL}/chat/lastChat/${userId}`)
        const json = await resp.json()

        setChats(prevChats => {
            const newChats = prevChats.filter(chat => json.user.id !== chat.user.id)
            return [json, ...newChats]
        }
        )
    }, [receiver])

    const getUpdatedChats = useCallback( async () => {
        const resp = await fetch(`${appURL}/chatList?limit=${chats.length}`)
        const json = await resp.json()

        setChats(json)
    }, [chats])

    useEffect(() => {
        getChats(`${appURL}/chatList`)
        setReceiver(companion)

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
        }, 5000);

        return () => {
            clearInterval(intervalId)
        }
    }, [chats])

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
                        {receiver ? (
                            <>
                                <div className="flex items-center">
                                    {
                                        isMobileView && <div className="mr-5 cursor-pointer" onClick={showSidebar}>
                                            <i class="fa fa-arrow-left" aria-hidden="true"></i>
                                        </div>
                                    }

                                    <ChatUserInfoHeader receiver={receiver} />
                                </div>

                                <div className="messanger mt-4 h-[82%]">
                                    <div className="flex flex-col h-full" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                                        <ChatMessages
                                            receiver={receiver}
                                            auth_id={auth.user.id}
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