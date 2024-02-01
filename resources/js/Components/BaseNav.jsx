import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import classNames from "classnames";

const MenuItem = ({ children: icone, linkUrl, linkTitle }) => {
    const { isChat } = usePage().props
    return <Link href={linkUrl} className="flex items-center justify-center lg:justify-start font-medium py-4 cursor-pointer">
        <div className="lg:mr-3">
            {icone}
        </div>

        {
            !isChat &&
            <div className="hidden lg:block">
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
        "border-t px-3 lg:px-6 fixed bottom-0 w-full md:max-w-[72px] bg-white md:relative md:py-8 md:border-t-0 md:border-r lg:max-w-16": true,
    })

    const navClasses = classNames({
        "w-full justify-between ml-10 flex md:flex-col md:ml-0": true
    })

    return <div className={classes}>
        <h1 className="sr-only">
            Chatter
        </h1>

        <div className="flex md:block">
            <div className="flex items-center justify-center lg:justify-start text-2xl md:mb-7">
                <div className="bg-slate-900 px-2 rounded-lg font-bold text-['28px'] text-white">
                    C
                </div>

                {
                    !isChat &&
                    <div className="font-semibold hidden lg:block">
                        hatter
                    </div>
                }
            </div>

            <nav className={navClasses}>
                <MenuItem linkUrl={route('home')} linkTitle="Home">
                    <i className="fa fa-home autowidth" aria-hidden="true"></i>
                </MenuItem>

                <MenuItem linkUrl={route('home')} linkTitle="Users">
                    <i className="fa fa-user autowidth" aria-hidden="true"></i>
                </MenuItem>

                <MenuItem linkUrl={route('chat.index')} linkTitle="Messages">
                    <div className="flex relative">
                        <i className="fa fa-inbox autowidth" aria-hidden="true"></i>

                        {
                            (newMessages && typeof window !== 'undefined' && !window.location.pathname.includes('/chat'))
                            &&
                            <div className="rounded-full h-[15px] w-[15px] bg-red-500 absolute top-[-6px] right-[-4px]"></div>
                        }
                    </div>
                </MenuItem>

                <MenuItem linkUrl={route('profile.show', auth.user.id)} linkTitle="Notifications">
                    <i className="fa fa-bell autowidth" aria-hidden="true"></i>
                </MenuItem>

                <MenuItem linkUrl={route('profile.show', auth.user.id)} linkTitle="Profile">
                    <Avatar user={auth.user} size="xsm"/>
                </MenuItem>
            </nav>
        </div>
    </div>
}