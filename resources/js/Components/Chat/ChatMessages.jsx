import UseInfiniteScroll from "@/infinitePaginationHook"
import { usePage } from "@inertiajs/react";
import { useEffect, useMemo, forwardRef } from "react";

export default forwardRef(function ChatMessages({ receiver, auth_id, nextPageUrl, messages, setMessages, setSavedMessages, getChatMessages, getLastMessage, preloader }, ref) {    
    const { public_url } = usePage().props
    const isReceivedMessage = (message) => {
        return message.receiver_id === auth_id;
    }

    const roomId = useMemo(() => {
        const sortedUserIds = [auth_id, receiver.id].sort()
        const roomId = sortedUserIds.join('')

        return roomId
    }, [auth_id, receiver.id])

    useEffect(() => {
        Echo.private(`messagereaded.${auth_id}`)
            .listen('MessageReaded', (e) => {
                setMessages(prevMessages => {
                    return prevMessages.map(el =>  {
                         el.status = 1
                         return el
                    })
                })

                setSavedMessages(prevMessages => {
                    return prevMessages.map(el =>  {
                        if (el.id === receiver.id) {
                            el.messages = el.messages.map(m => {
                                 m.status = 1
                                 return m
                            })
                        }
                         
                         return el
                    })
                })
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
        {preloader &&
            <div className="absolute bg-white z-[1] top-0 right-0 bottom-0 left-0 flex items-center justify-center">
                <img className="w-1/2 h-1/2" src={public_url + "/" + "loader.gif"} />
            </div> 
        }
            <UseInfiniteScroll
                request={getChatMessages}
                nextPageUrl={nextPageUrl}
                childrenClassNames="md:pr-5 w-full mb-[95px] "
                isReverseScroll={true}
                ref={ref}
                isLoadMoreTop={true}
            >
                {messages.map((message) => {
                    const isReceived = isReceivedMessage(message)

                    return <div key={message.id}>
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

                                    {
                                        !isReceived && (message.status ?

                                            <>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                <i className="fa fa-check" aria-hidden="true"></i>
                                            </> :
                                             <i className="fa fa-check" aria-hidden="true"></i>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
                )}
            </UseInfiniteScroll>
    </>)
})
