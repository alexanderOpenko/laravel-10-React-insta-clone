import UseInfiniteScroll from "@/infinitePaginationHook"
import { appURL } from "@/services";
import { useState, useEffect, useRef } from "react";

export default function ChatMessages({ receiver, auth_id }) {
    const [messages, setMessages] = useState([])
    const [readedMesages, setReadedMessages] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [nextPageUrl, setNextPageUrl] = useState('')
    const [isLastPage, setIsLastPage] = useState('')

    const initialMessagesLoaded = useRef(false);
    const scrollRef = useRef(null)

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
    }

    const getChatMessages = async (url) => {
        const resp = await fetch(url)
        const json = await resp.json()

        setNextPageUrl(json.next_page_url)
        setCurrentPage(json.current_page)

        if (json.last_page === json.current_page) {
            setIsLastPage(true)
        }

        setMessages(prevMessages => [...json.data.reverse(), ...prevMessages])
    }

    useEffect(() => {
        if (initialMessagesLoaded.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
            initialMessagesLoaded.current = false
        }

        if (!isLastPage) {
        scrollRef.current.scrollTop = (scrollRef.current.scrollHeight / currentPage) + scrollRef.current.scrollTop
        }

    }, [messages])

    useEffect(() => {
        getChatMessages(`${appURL}/chat/messages/${receiver.id}`)

        initialMessagesLoaded.current = true

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
        <UseInfiniteScroll
            request={getChatMessages}
            nextPageUrl={nextPageUrl}
            childrenClassNames="md:pr-5 w-full"
            isReverseScroll={true}
            ref={scrollRef}
            isLoadMoreTop={true}
        >
            {messages.map((message, index) => {
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
        </UseInfiniteScroll>
    );
}
