import { appURL } from "@/services";
import { useState, useEffect, useRef } from "react";

export default function ChatMessages({ receiver, messages: data, auth_id }) {
    const chatContainerRef = useRef(null);

    const [messages, setMessages] = useState(data)
    const [readedMesages, setReadedMessages] = useState(false)

    const isReceivedMessage = (message) => {
        return message.receiver_id === auth_id;
    };

    const getLastMessage = async () => {
        if (!receiver) {
            return
        }
        const resp = await fetch(`${appURL}/chat/lastMessage/${receiver.id}`)
        const json = await resp.json()

        if (json.sender_id === auth_id) {
            setReadedMessages(false)
        }

        setMessages(prevMessages => [...prevMessages, json])
        console.log(chatContainerRef.current.scrollHeight, 'scrollHeight');
    }

    useEffect(() => {
        console.log('huyuk');
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight 

    },[messages])

    useEffect(() => {
        const sortedUserIds = [auth_id, receiver?.id].sort()
        const roomId = sortedUserIds.join('')

        Echo.private(`messagereaded.${auth_id}`)
            .listen('MessageReaded', (e) => {
                setReadedMessages(true)
            })

        Echo.join(`messenger.${roomId}`)
            .listen('MessageSent', (e) => {
                getLastMessage()
            })
            .here((users) => {
                console.log(users, 'users');
            })
            .joining((user) => {
                console.log(user.name, 'user.name');
            })
            .leaving((user) => {
                console.log(user.name, 'user.name');
            })
            .error((error) => {
                console.error(error);
            });

        return () => {
            Echo.leave(`messenger.${roomId}`)
            Echo.leave(`messagereaded.${auth_id}`)
        }
    }, [])

    return (
        <div ref={chatContainerRef} className="overflow-y-auto px-4 w-full">
            {(messages || []).map((message, index) => {
                const isReceived = isReceivedMessage(message)

                return <div key={index}>
                    <div
                        className={`${isReceived
                            ? "receive-chat justify-start"
                            : "send-chat justify-end"
                            } relative flex`}
                    >

                        <div
                            className={`mb-2 max-w-[80%] rounded ${isReceived
                                ? "bg-violet-400"
                                : "bg-violet-200"
                                } p-2 text-sm ${isReceived
                                    ? "text-white"
                                    : "text-slate-500"
                                }`}
                        >
                            <div className="flex items-center">
                                <p className="mr-2">{message?.message}</p>

                                {!isReceived &&
                                    (message.status ?

                                        <>
                                            <i className="fa fa-check" aria-hidden="true"></i>
                                            <i className="fa fa-check" aria-hidden="true"></i>
                                        </> :
                                        (!readedMesages && <i class="fa fa-check" aria-hidden="true"></i>)
                                    )
                                }

                                {!isReceived &&
                                    (readedMesages && !message.status ?
                                        <>
                                            <i className="fa fa-check" aria-hidden="true"></i>
                                            <i className="fa fa-check" aria-hidden="true"></i>
                                        </> : ''
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    );
}
