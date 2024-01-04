import { Link } from "@inertiajs/react";

export default function BaseNav () {
    return <div className="py-12 px-6 max-w-16 border-r w-full h-dvh">
    <nav className="w-full h-full flex flex-col">
            <Link className="font-medium p-3 my-2 cursor-pointer">
                Home
            </Link>

            <Link className="font-medium p-3 my-2 cursor-pointer">
                Users
            </Link>

            <Link href={route('chat.index')} className="font-medium p-3 my-2 cursor-pointer">
                Messages
            </Link>

            <Link className="font-medium p-3 my-2 cursor-pointer">
                Notifications
            </Link>

            <Link className="font-medium p-3 my-2 cursor-pointer">
                Menu
            </Link>
    </nav>
    </div>
}