import ChatInput from "@/Components/Chat/ChatInput";
import ChatMessages from "@/Components/Chat/ChatMessages";
import ChatSidebar from "@/Components/Chat/ChatSidebar";
import ChatUserInfoHeader from "@/Components/Chat/ChatUserInfoHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { appURL } from "@/services";
import classNames from "classnames";
import { useEffect, useState } from "react";

export default function Chat(props) {
    const { auth, errors, recentMessages: chatsList, receiver } = props;
    const [chats, setChats] = useState([])
    const [currentView, setCurrentView] = useState('showSidebar')
    const [isMobileView, setIsMobileView] = useState(false)

    const getLastChat = async (userId = receiver.id) => {
        const resp = await fetch(`${appURL}/chat/lastChat/${userId}`)

        const json = await resp.json()

        setChats(prevChats => {
            const newChats = prevChats.filter(chat => json.user.id !== chat.user.id)
            return [json, ...newChats]
        }
        )
    }

    const getUpdatedChats = async () => {
        const resp = await fetch(`${appURL}/chatList`)
        const json = await resp.json()
        setChats(json)
    }

    const hideSidebar = () => {
        setCurrentView('hideSidebar')
    }

    const showSidebar = () => {
        setCurrentView('showSidebar')
    }

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

    useEffect(() => {
        setChats(chatsList)

        Echo.private(`chatmessages.${auth.user.id}`)
            .listen('ChatMessageSent', (e) => {
                getLastChat(e.user_id)
            })

        const intervalId = setInterval(() => {
            getUpdatedChats()
        }, 180000);

        return () => {
            clearInterval(intervalId)
            Echo.leave(`chatmessages.${auth.user.id}`)
        }
    }, [chatsList])

    const sidebarClasses = classNames({
        "border-r border-slate-100 bg-white pt-3 overflow-y-auto h-[100vh]": true,
        "hidden": currentView === 'hideSidebar' && isMobileView,
        "w-full": currentView === 'showSidebar',
        "basis-2/6": !isMobileView
    })

    const chatWindowClasses = classNames({
        "relative p-4 w-full": true,
        "basis-4/6": !isMobileView,
        "hidden": currentView === 'showSidebar' && isMobileView,
    })

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <div className="messanger overflow-hidden">
                <div className="flex h-screen">
                    <div className={sidebarClasses}>
                        <ChatSidebar
                            recentMessages={chats}
                            receiverId={receiver?.id}
                            auth_id={auth.user.id}
                        />
                    </div>

                    <div className={chatWindowClasses}>
                        {receiver?.id ? (
                            <>
                                <div className="flex items-center">
                                    {
                                        isMobileView && <div className="mr-5 cursor-pointer" onClick={showSidebar}>
                                            <i class="fa fa-arrow-left" aria-hidden="true"></i>
                                        </div>
                                    }

                                    <ChatUserInfoHeader receiver={receiver} />
                                </div>
                                <div className="messanger mt-4">
                                    <div className="flex flex-col" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                                        <ChatMessages
                                            receiver={receiver}
                                            auth_id={auth?.user?.id}
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