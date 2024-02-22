import UseInfiniteScroll from "@/infinitePaginationHook"
import { hoursAndMinutes } from "@/services";
import { usePage } from "@inertiajs/react";
import classNames from "classnames";
import { useEffect, useMemo, forwardRef } from "react";

export default forwardRef(function ChatMessages({ receiver, auth_id, nextPageUrl, messages, setMessages, setSavedMessages, getChatMessages, getLastMessage, preloader }, ref) {
    const { public_url } = usePage().props
    console.log(messages, 'messages');
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
                    return prevMessages.map(el => {
                        el.status = 1
                        return el
                    })
                })

                setSavedMessages(prevMessages => {
                    return prevMessages.map(el => {
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
        {preloader ?
            <div className="bg-transparent z-[2] w-full h-full flex items-center justify-center">
                <img className="w-1/2 h-1/2" src={public_url + "/" + "loader.png"} />
            </div>
        :
        <UseInfiniteScroll
            request={getChatMessages}
            nextPageUrl={nextPageUrl}
            childrenClassNames="w-full mb-[75px]"
            bodyClasses=" max-w-xl mx-auto"
            isReverseScroll={true}
            ref={ref}
            isLoadMoreTop={true}
        >
            {messages.map((message) => {
                const time = hoursAndMinutes(message.created_at)
                const isReceived = isReceivedMessage(message)

                const messageGridClasses = classNames({
                    "relative flex": true,
                    "receive-chat justify-start": isReceived,
                    "send-chat justify-end": !isReceived
                })

                const messageClasses = classNames({
                    "mb-2 max-w-[80%] rounded flex pl-[8px] pr-[6px] py-[5px] font-roboto" : true, 
                    "bg-white": isReceived,
                    "bg-[#eeffde]": !isReceived
                })

                const timeColor = classNames({
                    "mr-[2px] leading-[0.65]": true,
                    "text-[#4fae4e]": !isReceived,
                    "text-zinc-400": isReceived
                })

                return <div key={message.id}>
                    <div className={messageGridClasses}>
                        <div className={messageClasses}>
                            <div className="mr-[11px] leading-[1.3] text-zinc-700 font-[450]">
                                {message?.message}
                            </div>

                            <div className="flex items-end text-xs leading-[1]">
                                <div className={timeColor}>
                                    {time}
                                </div>

                                {
                                    !isReceived && <div className="text-[#eeffde]"> 
                                        {message.status ?
                                        <div className="whitespace-nowrap">
                                            <i className="fa fa-check fa-lg check-icon relative w-[14px]" aria-hidden="true"></i>
                                            <i className="fa fa-check ml-[-9px] fa-lg check-icon" aria-hidden="true"></i>
                                        </div> :

                                        <div>
                                            <i className="fa fa-check fa-lg check-icon w-[14px]" aria-hidden="true"></i>
                                        </div>}                                    
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            )}
        </UseInfiniteScroll>}
    </>)
})
