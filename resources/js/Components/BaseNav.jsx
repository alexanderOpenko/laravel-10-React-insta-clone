import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function BaseNav() {
    const { new_messeges } = usePage().props

    const [newMessages, setNewMessages] = useState(new_messeges)
    const { auth } = usePage().props

    useEffect(() => {
        Echo.private(`chatmessages.${auth.user.id}`)
            .listen('ChatMessageSent', (e) => {
                setNewMessages(true)
            })
    }, [])

    return <div className="py-12 px-6 max-w-16 border-r w-full h-dvh">
        <nav className="w-full h-full flex flex-col">
            <Link className="font-medium p-3 my-2 cursor-pointer">
                Home
            </Link>

            <Link className="font-medium p-3 my-2 cursor-pointer">
                Users
            </Link>

            <div className="flex items-center">
                <Link href={route('chat.index')} className="font-medium p-3 my-2 cursor-pointer">
                    Messages
                </Link>

                {
                (newMessages && !window.location.pathname.includes('/chat')) && <div className="rounded-full p-2 bg-red-500">
                </div>
                }
            </div>

            <Link className="font-medium p-3 my-2 cursor-pointer">
                Notifications
            </Link>

            <Link className="font-medium p-3 my-2 cursor-pointer">
                Menu
            </Link>
        </nav>
    </div>
}