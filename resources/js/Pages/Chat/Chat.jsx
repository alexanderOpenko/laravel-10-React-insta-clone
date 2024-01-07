import ChatInput from "@/Components/Chat/ChatInput";
import ChatMessages from "@/Components/Chat/ChatMessages";
import ChatSidebar from "@/Components/Chat/ChatSidebar";
import ChatUserInfoHeader from "@/Components/Chat/ChatUserInfoHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";

export default function Chat(props) {
    const { auth, errors, recentMessages: chatsList, receiver, messages } = props;
    const [chats, setChats] = useState([])

    const getLastChat = async (userId = receiver.id) => {
        const resp = await fetch(`http://127.0.0.1:8000/chat/lastChat/${userId}`)

        const json = await resp.json()

        setChats(prevChats => {
            const newChats = prevChats.filter(chat => json.user.id !== chat.user.id)
            return [json, ...newChats]
        }
        )
    }

    const getUpdatedChats = async () => {
        const resp = await fetch(`http://127.0.0.1:8000/chatList`)
        const json = await resp.json()
        setChats(json)
    }

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

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <div className="">
                <div className="messanger overflow-hidden p-4">
                    <div className="flex">
                        <div className="basis-2/6 border-r border-slate-100 bg-white pt-3">
                            <ChatSidebar 
                            recentMessages={chats} 
                            receiverId={receiver?.id}
                            auth_id={auth.user.id} 
                            />
                        </div>

                        <div className="basis-4/6">
                            {receiver?.id ? (
                                <>
                                    <ChatUserInfoHeader receiver={receiver} />
                                    <div className="messanger mt-4">
                                        <div className="flex flex-col" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                                            <div className="px-4 overflow-y-auto w-full">
                                                <ChatMessages
                                                    receiver={receiver}
                                                    messages={messages}
                                                    auth_id={auth?.user?.id}
                                                />
                                            </div>

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
            </div>
        </AuthenticatedLayout>
    );
}
