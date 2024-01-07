import { Link } from "@inertiajs/react";
import Avatar from "../Avatar";

export default function ChatSidebar({ recentMessages, receiverId, auth_id }) {
    return (
        <div className="user-list overflow-y-auto">
            {recentMessages.map((el, index) => (
                <Link
                    href={`/chat/${el.user.id}`}
                    key={index}
                    className="flex px-5 py-3 transition hover:cursor-pointer hover:bg-slate-100"
                >
                    <div className="pr-4">
                        {el.user.avatar && <Avatar user={el.user} size="sm"/>}
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
                </Link>
            ))}
        </div>
    );
}
