import Avatar from "../Avatar";
import { useRef, memo, useEffect, useState } from "react";
import UseInfiniteScroll from "@/Components/infinitePaginationHook"
import TransparentButton from "../TransparentButton";
import classNames from "classnames";
import { appURL } from "@/services";
import UserCard from "../Users/UserCard";

export default memo(function ChatSidebar({ auth_id, nextPageUrl, chats, getChats, setReceiverHandler }) {
    const scrollRef = useRef(null)
    const [following, setFollowing] = useState([])

    const followingRequest = async () => {
        const resp = await fetch(`${appURL}/following/${auth_id}?nopaginate=1`)
        const json = await resp.json()

        setFollowing([...following, ...json.data])
    }

    useEffect(() => {
        if (!chats.length) {
            followingRequest()
        }
    }, [])

    return (
        <>  
            <div className="md:text-2xl text-base font-semibold mb-4 px-5">
                Messages
            </div>
            {!!chats.length ?
                <UseInfiniteScroll
                    ref={scrollRef}
                    request={getChats}
                    nextPageUrl={nextPageUrl}
                    childrenClassNames="h-full max-h-chat-sidebar-height"
                >
                    {chats.map((el, index) => {
                        const messageClasses = classNames({
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
                                <Avatar user={el.user} size="sm" isLinkable={false} />
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
                : following.length ? <div className="overflow-y-auto h-full">
                    {following.map((el) => {
                        return <UserCard user={el.user} authUserFollowed={el.authUserFollowed} isMessageButton={true}/>
                    })}
                </div>
                : <div className="font-medium text-sm h-full flex items-center p-3">
                    🔔 Follow users or send messages to users to see chats 🔔
                </div>
            }
        </>
    )
})
