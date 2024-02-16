import UseInfiniteScroll from "@/infinitePaginationHook"
import { appURL } from "@/services";
import { usePage } from "@inertiajs/react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

export default function ChatMessages({ receiver, auth_id }) {
    const [messages, setMessages] = useState([])
    const [readedMesages, setReadedMessages] = useState(false)
    const [nextPageUrl, setNextPageUrl] = useState('')
    const [prevScrollHeight, setPrevScrollHeight] = useState(null)
    const initialMessagesLoaded = useRef(false);
    const scrollRef = useRef(null)
    const [preloader, setPreloader] = useState(false)

    const { public_url } = usePage().props

    const isReceivedMessage = (message) => {
        return message.receiver_id === auth_id;
    };

    const getLastMessage = useCallback(async () => {
        if (!receiver.id) {
            return
        }
        const resp = await fetch(`${appURL}/chat/lastMessage/${receiver.id}`)
        const json = await resp.json()

        handleReadedMessage()

        setMessages(prevMessages => [...prevMessages, json])
    }, [receiver])

    const handleReadedMessage = useCallback((e) => {
        setReadedMessages(true);
    }, []);

    const getChatMessages = useCallback(async (url, firstInit = false) => {
        const resp = await fetch(url)
        const json = await resp.json()

        setNextPageUrl(json.next_page_url)

        if (firstInit) {
            setMessages(json.data.reverse())
            setPreloader(false)

        } else {
            setMessages(prevMessages => [...json.data.reverse(), ...prevMessages])
            setPrevScrollHeight(scrollRef.current.scrollHeight)
        }
    }, [receiver])

    useEffect(() => {
        if (initialMessagesLoaded.current) {
            console.log('initialMessagesLoaded');

            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
            initialMessagesLoaded.current = false
            return
        }
    }, [messages])

    useEffect(() => {
        const scrollDifference = scrollRef.current.scrollHeight - prevScrollHeight;
        scrollRef.current.scrollTop += scrollDifference;
    }, [prevScrollHeight])

    const roomId = useMemo(() => {
        const sortedUserIds = [auth_id, receiver.id].sort()
        const roomId = sortedUserIds.join('')

        return roomId
    }, [auth_id, receiver.id])

    useEffect(() => {
        setPreloader(true)
        initialMessagesLoaded.current = true

        getChatMessages(`${appURL}/chat/messages/${receiver.id}`, true)

        Echo.private(`messagereaded.${auth_id}`)
            .listen('MessageReaded', (e) => {
                handleReadedMessage()
            })

        Echo.join(`messenger.${roomId}`)
            .listen('MessageSent', (e) => {
                getLastMessage()
            })
            .here((users) => {
            })
            .joining((user) => {
            })
            .leaving((user) => {
            })
            .error((error) => {
            });

        return () => {
            Echo.leave(`messenger.${roomId}`)
            Echo.leave(`messagereaded.${auth_id}`)
        }
    }, [receiver])

    return (<>
        {preloader ?
            <div className="h-full flex items-center justify-center">
                <img className="w-1/2 h-1/2" src={public_url + "/" + "loader.gif"} />
            </div> :
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
                                            (!readedMesages && <i className="fa fa-check" aria-hidden="true"></i>)
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
                }
                )}
            </UseInfiniteScroll>
        }
    </>)
}
