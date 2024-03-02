import Avatar from "../Avatar";
import { useRef, memo } from "react";
import UseInfiniteScroll from "@/Components/infinitePaginationHook"
import TransparentButton from "../TransparentButton";
import classNames from "classnames";

export default memo(function ChatSidebar({ auth_id, nextPageUrl, chats, getChats, setReceiverHandler }) {
    const scrollRef = useRef(null)

    return (
        <>
            {!!chats.length &&
                <UseInfiniteScroll
                    ref={scrollRef}
                    request={getChats}
                    nextPageUrl={nextPageUrl}
                    childrenClassNames="h-full"
                >
                    {chats.map((el, index) => {
                        const messageClasses =  classNames({
                            "h-5 overflow-hidden text-base font-normal text-zinc-500 max-w-[150px]": true,
                            "font-bold text-gray-700": !el.message.status && auth_id !== el.message.sender_id
                        }) 

                        return <TransparentButton
                            type="button"
                            onClick={() => setReceiverHandler(el.user)}
                            key={index}
                            className="flex px-5 py-3 transition hover:cursor-pointer hover:bg-slate-100"
                        >
                            <div className="pr-4">
                                <Avatar user={el.user} size="sm" isLinkable={false}/>
                            </div>

                            <div className="w-full">
                                <div className="flex items-center">
                                    <h3 className="text-md text-violet-500">
                                        {el.user.name}
                                    </h3>

                                    {!!el.user.online && <div className="rounded-full ml-2 bg-emerald-500 p-1 h-1/2"></div>}
                                </div>

                                <div className="flex justify-between">
                                    <div className={messageClasses}>
                                        {el.message.message}
                                    </div>

                                    {(!el.message.status && auth_id !== el.message.sender_id) && <div className="rounded-full bg-cyan-500 px-2 text-white">
                                        new
                                    </div>}
                                </div>
                            </div>
                        </TransparentButton>
                    })}
                </UseInfiniteScroll>
            }
        </>
    )
})
