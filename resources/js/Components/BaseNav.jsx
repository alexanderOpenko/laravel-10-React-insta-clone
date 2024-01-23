import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import classNames from "classnames";

const MenuItem = ({ children: icone, linkUrl, linkTitle }) => {
    const { isChat } = usePage().props
    return <Link href={linkUrl} className="flex items-center font-medium py-4 cursor-pointer">
        <div>
            {icone}
        </div>

        {
            !isChat &&
            <div>
                {linkTitle}
            </div>
        }
    </Link>
}

export default function BaseNav() {
    const { new_messeges, isChat } = usePage().props
    const [newMessages, setNewMessages] = useState(new_messeges)
    const { auth } = usePage().props

    useEffect(() => {
        Echo.private(`chatmessages.${auth.user.id}`)
            .listen('ChatMessageSent', (e) => {
                setNewMessages(true)
            })
    }, [])

    const classes = classNames({
        'w-full': !isChat,
    })

    return <div className={`py-8 px-6 border-r max-w-16 h-dvh ${classes}`}>
        <h1 className="sr-only">
            Chatter
        </h1>

        <div className="flex text-2xl mb-7">
            <div className="bg-slate-900 px-2 rounded-lg font-bold text-['28px'] text-white">
                C
            </div>

            {
                !isChat &&
                <div className="font-semibold">
                    hatter
                </div>
            }
        </div>

        <nav className="w-full h-full flex flex-col">
            <MenuItem linkUrl={route('home')} linkTitle="Home">
                <i className="fa fa-home mr-3 autowidth" aria-hidden="true"></i>
            </MenuItem>

            <MenuItem linkUrl={route('home')} linkTitle="Users">
                <i className="fa fa-user mr-3 autowidth" aria-hidden="true"></i>
            </MenuItem>

            <MenuItem linkUrl={route('chat.index')} linkTitle="Messages">
                <div className="flex mr-3 relative">
                    <i className="fa fa-inbox autowidth" aria-hidden="true"></i>

                    {
                        (newMessages && typeof window !== 'undefined' && !window.location.pathname.includes('/chat'))
                        &&
                        <div className="rounded-full h-[15px] w-[15px] bg-red-500 absolute top-[-6px] right-[-4px]"></div>
                    }
                </div>
            </MenuItem>

            <MenuItem linkUrl={route('profile.show', auth.user.id)} linkTitle="Notifications">
                <i className="fa fa-bell mr-3 autowidth" aria-hidden="true"></i>
            </MenuItem>

            <MenuItem linkUrl={route('profile.show', auth.user.id)} linkTitle="Profile">
                <Avatar user={auth.user} size="xsm" divClassName="mr-3" />
            </MenuItem>
        </nav>
    </div>
}