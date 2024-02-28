import { usePage } from "@inertiajs/react"

export default function CommentLikeNotification({ userName, text, imagePath = null, birhday = null, likerId = null }) {
    const { public_url, auth } = usePage().props

    return <>{auth.user.id !== likerId && <div className="flex justify-between">
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
    </div>}

        {auth.user.id === likerId && <div className="flex justify-between mt-4">
            <div className="font-medium"> фууу самолайк </div>

            <img src={public_url + "/" + "selflike.jpg"} className="h-[80px] max-w-[117px] w-full object-cover h-full" />
        </div>}
    </>
}