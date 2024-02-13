import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from "react";
import { appURL } from "@/services";
import NotificationItem from '@/Components/Notifications/NotificationItem';
import UseInfiniteScroll from "@/infinitePaginationHook";

export default function Notifications({ auth }) {
    const [notifications, setNotifications] = useState([])
    const [nextPageUrl, setNextPageUrl] = useState('')

    const notificationsRequest = async (url) => {
        const resp = await fetch(url)
        const json = await resp.json()

        setNextPageUrl(json.next_page_url)
        setNotifications([...notifications, ...json.data])
    }

    useEffect(() => {
        notificationsRequest(`${appURL}/notifications/list`)
    }, [])

    return (
        <>
            <AuthenticatedLayout
                auth={auth}
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Notifications</h2>}
            >
                <div className="mx-auto w-full max-w-lg p-3 md:p-6">
                    <h1 className="text-2xl font-semibold mb-4">
                        Notifications
                    </h1>

                    {notifications.map((el) => {
                        return <NotificationItem el={el} />
                    })}

                    <UseInfiniteScroll request={notificationsRequest} nextPageUrl={nextPageUrl} />
                </div>
            </AuthenticatedLayout>
        </>
    )
}