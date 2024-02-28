import Avatar from "@/Components/Avatar";
import { Link } from "@inertiajs/react";
import CreatedAt from "../CreatedAt";

export default function PostHeader({ post, classNames }) {
    return <div className={`post-user border-b border-slate-100 border-solid p-4 flex items-center justify-between ` + classNames}>
        <Link href={route('profile.show', post.user.id)}>
            <div className="flex items-center">
                <Avatar user={post.user} size="sm" divClassName="mr-4" />

                <div className="flex items-center">
                    <div className="font-bold text-sm">
                        {post.user.name} 
                    </div>

                    <code className="mx-2">&#8212;</code>

                    <CreatedAt createdAt={post.created_at} />
                </div>
            </div>
        </Link>

        <div>
            <svg aria-label="More options" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
        </div>
    </div>
}