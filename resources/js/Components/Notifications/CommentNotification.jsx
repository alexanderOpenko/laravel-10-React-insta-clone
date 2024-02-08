import { usePage } from "@inertiajs/react"

export default function CommentLikeNotification({ user, text, imagePath }) {
    const { public_url } = usePage().props

    return <div className="flex justify-between">
        <div className="mr-4">
            <span className="line-clamp-2">
                <span className="font-semibold"> {user.name} </span> 

                <span className="text-sm font-normal">
                    { text }
                </span>
            </span>
        </div>

        <div className="h-[70px] max-w-[70px] w-full">
            <img src={ public_url + "/" + imagePath } className="object-cover h-full" />
        </div>
    </div>
}