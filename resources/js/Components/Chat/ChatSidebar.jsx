import Avatar from "../Avatar";
import { useRef, memo } from "react";
import UseInfiniteScroll from "@/infinitePaginationHook"

export default memo(function ChatSidebar({ auth_id, nextPageUrl, chats, getChats, setReceiverHandler }) {
    console.log('chatSidebar');
    const scrollRef = useRef(null)

    return (
        <>
            {!!chats.length && 
                <UseInfiniteScroll
                    ref={scrollRef}
                    request={getChats}
                    nextPageUrl={nextPageUrl}
                >
                    {chats.map((el, index) => (
                        <div
                            onClick={() => setReceiverHandler(el.user)}
                            key={index}
                            className="flex px-5 py-3 transition hover:cursor-pointer hover:bg-slate-100"
                        >
                            <div className="pr-4">
                                <Avatar user={el.user} size="sm" />
                            </div>

                            <div className="w-full">
                                <div className="flex items-center">
                                    <h3 className="text-md text-violet-500">
                                        {el.user.name}
                                    </h3>

                                    {!!el.user.online && <div className="rounded-full ml-2 bg-cyan-500 p-1 h-1/2"></div>}
                                </div>

                                <div className="flex justify-between">
                                    <p className={
                                        !el.message.status && auth_id !== el.message.sender_id

                                            ? "font-bold h-5 overflow-hidden text-sm"
                                            :
                                            "h-5 overflow-hidden text-sm font-light text-gray-400"
                                    }>
                                        {el.message.message}
                                    </p>

                                    {(!el.message.status && auth_id !== el.message.sender_id) && <div className="rounded-full bg-cyan-500 px-2 text-white">
                                        new
                                    </div>}
                                </div>
                            </div>
                        </div>
                    ))}
                </UseInfiniteScroll>
            }
        </>
    )
})
