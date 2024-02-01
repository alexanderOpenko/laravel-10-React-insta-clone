import Modal from "@/Components/Modal";
import { usePage } from '@inertiajs/react';
import Comments from "./Comment";
import Avatar from "@/Components/Avatar";
import PostHeader from "./PostHeader";

export default function ShowPostModal({ post, posts, ...props }) {
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
                <PostHeader post={post} />

                <div className="p-4">
                    <div className="post-message">
                        {
                            !!post.message &&
                            <div className="flex mb-4">
                                <Avatar size="sm" user={post.user} />

                                <div className="px-4 py-1">
                                    <span className="font-bold text-sm mr-1">
                                        {post.user.name}
                                    </span> 
                                    
                                    <span>
                                        {post.message}
                                    </span>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="post-comments w-full">
                        <Comments post={post} posts={posts}/>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
}
