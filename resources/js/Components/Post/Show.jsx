import Modal from "@/Components/Modal";
import { usePage } from '@inertiajs/react';
import Comments from "./Comment";
import Avatar from "@/Components/Avatar";
import PostHeader from "./PostHeader";
import CommentsForm from "../CommentsForm";
import { useState } from "react"

export default function ShowPostModal({ post, posts, ...props }) {
    const { public_url } = usePage().props
    const [comments, setComments] = useState([])
    const [nextPageUrl, setNextPageUrl] = useState('')
    const { auth } = usePage().props

    const commentsRequest = async (url) => {
        const resp = await fetch(url)
        const json = await resp.json()
        setNextPageUrl(json.next_page_url)

        setComments(prevComments => {
            const uniqueComments = json.data.filter(newComment => {
                return !prevComments.some(prevComment => prevComment.id === newComment.id);
            });

            return [...prevComments, ...uniqueComments];
        });
    }

    return <Modal {...props}>
        <div className="flex h-full">
            {
                !!post.images && <div
                    className="w-full max-w-3xl hidden md:block"
                >
                    <img className="w-full object-contain h-full" src={public_url + "/" + post.images[0].image_path} />
                </div>
            }

            <div className="w-full md:max-w-md relative flex flex-col justify-between">
                <div className="overflow-y-auto">
                    <PostHeader post={post} />

                    <div className="p-4 pr-0">
                        <div className="post-comments w-full">
                            <Comments post={post} comments={comments} auth={auth} commentsRequest={commentsRequest} nextPageUrl={nextPageUrl} />
                        </div>
                    </div>
                </div>

                <div className="sticky left-[16px] pb-[15px] bg-white px-[16px] bottom-0">
                    <CommentsForm post={post} posts={posts} auth={auth} setComments={setComments} />
                </div>
            </div>
        </div>
    </Modal>
}
