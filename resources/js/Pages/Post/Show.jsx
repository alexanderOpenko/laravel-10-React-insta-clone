import Modal from "@/Components/Modal";
import { usePage } from '@inertiajs/react';
import Comments from "./Comment";
import Avatar from "@/Components/Avatar";

export default function ShowPostModal(props) {
    const { post } = props
    const { public_url } = usePage().props

    return <Modal {...props}>
        <div className="flex">
            {
                !!post.images && <div
                    className="w-full max-w-3xl relative pt-59 bg-black	"
                >
                    <img className="w-full absolute object-contain top-0 h-full" src={public_url + "/" + post.images[0].image_path} />
                </div>
            }

            <div className="w-full max-w-md relative">
                <div className="post-user border-b border-slate-100 border-solid p-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <Avatar user={post.user} size="sm" divClassName="mr-4" />
                        <div>{post.user.name}</div>
                    </div>

                    <div>
                        <svg aria-label="More options" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                    </div>
                </div>

                <div className="p-4">
                    <div className="post-message">
                        {
                            !!post.message &&
                            <div className="flex mb-4">
                                <Avatar size="sm" user={post.user} />

                                <div className="px-4 py-1">
                                    {post.user.name} {post.message}
                                </div>
                            </div>
                        }
                    </div>

                    <div className="post-comments w-full">
                        <Comments postId={post.id} />
                    </div>
                </div>
            </div>
        </div>
    </Modal>
}
