export default function BaseNav () {
    return <div className="py-12 px-6 max-w-16 border-r w-full h-dvh">
    <nav className="w-full h-full">
        <ul>
            <li className="font-medium p-3 my-2 cursor-pointer">
                Home
            </li>

            <li className="font-medium p-3 my-2 cursor-pointer">
                Users
            </li>

            <li className="font-medium p-3 my-2 cursor-pointer">
                Messages
            </li>

            <li className="font-medium p-3 my-2 cursor-pointer">
                Notifications
            </li>

            <li className="font-medium p-3 my-2 cursor-pointer">
                Menu
            </li>
        </ul>
    </nav>
    </div>
}