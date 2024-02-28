import { usePage } from "@inertiajs/react"

export default function CommentLikeNotification({ userName, text, imagePath = null, birhday = null }) {
    const { public_url } = usePage().props

    return <div className="flex justify-between">
        <div className="mr-4 max-w-[76%]">
            <div className="line-clamp-2 overflow-hidden">
                <div className="font-semibold"> {userName} </div>

                <div className="text-sm font-normal max-h-[100px] truncateMultiline">
                    {text}
                </div>

                {birhday && <div>
                    {birhday}
                </div>}
            </div>
        </div>

        {imagePath && <img src={public_url + "/" + imagePath} className="h-[70px] max-w-[70px] w-full object-cover h-full" />}
    </div>
}