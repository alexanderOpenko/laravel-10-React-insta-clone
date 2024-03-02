import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import classNames from "classnames";
import NotificationItem from "./Notifications/NotificationItem";
import NotificationSound from "./Notifications/PlayNotififcationSound";

const MenuItem = ({ children: icone, linkUrl, linkTitle }) => {
    const { isChat } = usePage().props
    const iconClasses = classNames({
        "flex justify-center": true,
        "w-full": isChat,
        "lg:mr-3": !isChat
    })

    return <Link href={linkUrl} className="flex items-center justify-center lg:justify-start font-medium py-4 cursor-pointer">
        <div className={iconClasses}>
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
    const { new_messeges, isChat, new_notifications } = usePage().props
    const [newMessages, setNewMessages] = useState(new_messeges)
    const [newNotification, setNewNotification] = useState(new_notifications)
    const [notifications, setNotifications] = useState([])
    const { auth } = usePage().props
    const { play } = NotificationSound()

    useEffect(() => {
        Echo.private(`chatmessages.${auth.user.id}`)
            .listen('ChatMessageSent', (e) => {
                setNewMessages(true)
                play()
                console.log(1)
            })

        Echo.private(`notification.${auth.user.id}`)
            .listen('NotificationSent', (e) => {
                setNewNotification(true)
                setNotifications(prevNotifications => [...prevNotifications, ...e.data])
                play()
                console.log(2)
            })

        return () => {
            Echo.leave(`chatmessages.${auth.user.id}`)
            Echo.leave(`notification.${auth.user.id}`)
        }
    }, [])

    useEffect(() => {
        const processNotificationQueue = () => {
            if (notifications.length > 0) {

                setNotifications(prevNotifications => prevNotifications.slice(1))
            }
        };

        const interval = setInterval(() => {
            processNotificationQueue()
        }, 4000)

        return () => {
            clearInterval(interval);
        };
    }, [notifications]);

    const classes = classNames({
        "border-t px-3 lg:px-6 fixed bottom-0 md:max-w-[72px] bg-white md:relative md:py-8 md:border-t-0 md:border-r lg:max-w-16 z-[11]": true,
        "max-[769px]:w-full lg:!px-3": isChat,
        "w-full": !isChat
    })

    const navClasses = classNames({
        "w-full justify-between ml-10 flex md:flex-col md:ml-0": true
    })

    return <>
        <div className={classes}>
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

                    <MenuItem linkUrl={route('users.index')} linkTitle="Users">
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


                    <MenuItem linkUrl={route('notifications.index', auth.user.id)} linkTitle="Notifications">
                        <div className="flex relative">
                            <i className="fa fa-bell autowidth" aria-hidden="true"></i>

                            {
                                (newNotification && typeof window !== 'undefined' && !window.location.pathname.includes('/notification'))
                                &&
                                <div className="rounded-full h-[15px] w-[15px] bg-red-500 absolute top-[-6px] right-[-4px]"></div>
                            }
                        </div>
                    </MenuItem>

                    <MenuItem linkUrl={route('profile.show', auth.user.id)} linkTitle="Profile">
                        <Avatar user={auth.user} size="xsm" isLinkable={false}/>
                    </MenuItem>
                </nav>
            </div>
        </div>

        <div className="fixed right-0 bottom-0 p-4 mb-11 w-full sm:max-w-md  z-[100]">
            {notifications.map((el) => {
                return <div className="bg-slate-950 text-white p-4 pb-2 mb-3 rounded-[15px]">
                    <NotificationItem el={el} />
                </div>
            })}
        </div>
    </>
}