import UseInfiniteScroll from "@/Components/infinitePaginationHook"
import dateString, { getMonth, hoursAndMinutes } from "@/services";
import { usePage } from "@inertiajs/react";
import classNames from "classnames";
import { useEffect, useMemo, forwardRef, useCallback } from "react";

export default forwardRef(function ChatMessages({ receiver, auth_id, nextPageUrl, messages, setMessages, setSavedMessages, getChatMessages, getLastMessage, preloader }, ref) {
    const { public_url } = usePage().props

    const isReceivedMessage = useCallback((message) => {
        return message.receiver_id === auth_id;
    }, [receiver])

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
                childrenClassNames="w-full h-full"
                bodyClasses=" max-w-xl mx-auto min-h-full"
                isReverseScroll={true}
                ref={ref}
                isLoadMoreTop={true}
            >
                {messages.map((message, i) => {
                    const currentDateString = dateString(message.created_at)
                    
                    const prevDate = i ? new Date(messages[i - 1].created_at) : ''
                    const prevDateString = prevDate ? `${getMonth(prevDate)} ${prevDate.getDate()}` : ''
                    const date = currentDateString !== prevDateString ? currentDateString : ''

                    return <Message message={message} key={message.id} isReceivedMessage={isReceivedMessage} date={date} />
                })}
            </UseInfiniteScroll>}
    </>)
})

const Message = ({ message, isReceivedMessage, date }) => {
    const time = hoursAndMinutes(message.created_at)
    const isReceived = isReceivedMessage(message)

    const messageGridClasses = classNames({
        "flex": true,
        "receive-chat justify-start": isReceived,
        "send-chat justify-end": !isReceived
    })

    const messageClasses = classNames({
        "mb-2 max-w-[85%] pl-[8px] pr-[6px] py-[5px] font-roboto rounded-2xl break-words": true,
        "bg-white rounded-bl-none": isReceived,
        "bg-[#eeffde] rounded-br-none": !isReceived
    })

    const timeColor = classNames({
        "mr-[2px] leading-[0.65]": true,
        "text-[#4fae4e]": !isReceived,
        "text-zinc-400 pt-[5px]": isReceived
    })

    return <>
        {date && <div className={"flex justify-center py-1 px-2 font-medium text-white sticky top-0 " + `z-[${message.id}]`}>
            <div className="bg-zinc-400 px-2 py-1 rounded-full leading-[1] text-center text-sm md:text-base min-w-[102px]" >
                {date}
            </div>
        </div>}

        <div className={messageGridClasses}>
            <div className={messageClasses}>
                <div className="leading-[1.3] text-zinc-700 font-[450]">
                    {message?.message}
                </div>

                <div className="flex items-end mb-[3px] justify-end text-xs leading-[1]">
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
    </>
}

