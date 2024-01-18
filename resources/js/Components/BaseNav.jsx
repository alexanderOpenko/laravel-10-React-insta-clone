import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";

const MenuItem = ({ children }) => {
    return <div className="flex items-center font-medium py-4 cursor-pointer">
        {children}
    </div>
}

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

    return <div className="py-8 px-6 max-w-16 border-r w-full h-dvh">
        <h1 className="font-semibold text-2xl mb-7">
            Chatter
        </h1>

        <nav className="w-full h-full flex flex-col">
            <MenuItem>
                <i className="fa fa-home mr-3 autowidth" aria-hidden="true"></i>

                <Link href={route('home')}>
                    Home
                </Link>
            </MenuItem>

            <MenuItem>
                <i className="fa fa-user mr-3 autowidth" aria-hidden="true"></i>

                <Link>
                    Users
                </Link>
            </MenuItem>

            <MenuItem>
                <div className="flex mr-3 relative">
                    <i className="fa fa-inbox autowidth" aria-hidden="true"></i>

                    {
                        (newMessages && typeof window !== 'undefined' && !window.location.pathname.includes('/chat'))
                        &&
                        <div className="rounded-full h-[15px] w-[15px] bg-red-500 absolute top-[-6px] right-[-4px]"></div>
                    }
                </div>

                <div className="flex items-center">
                    <Link href={route('chat.index')}>
                        Messages
                    </Link>
                </div>
            </MenuItem>

            <MenuItem>
                <i className="fa fa-bell mr-3 autowidth" aria-hidden="true"></i>

                <Link>
                    Notifications
                </Link>
            </MenuItem>

            <MenuItem>
                <Avatar user={auth.user} size="xsm" divClassName="mr-3" />

                <Link href={route('profile.show', auth.user.id)}>
                    Profile
                </Link>
            </MenuItem>
        </nav>
    </div>
}