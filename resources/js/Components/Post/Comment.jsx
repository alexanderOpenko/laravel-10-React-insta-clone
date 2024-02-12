import Modal from "@/Components/Modal"
import { useForm, usePage } from "@inertiajs/react"
import { useState, useEffect, useRef } from "react"
import TransparentButton from "@/Components/TransparentButton"
import Avatar from "@/Components/Avatar"
import UseInfiniteScroll from "@/infinitePaginationHook"
import { appURL } from "@/services";
import CommentsForm from "@/Components/CommentsForm";

export default function Comments({ post, posts }) {
    const { auth } = usePage().props
    const [comments, setComments] = useState([])
    const [nextPageUrl, setNextPageUrl] = useState('')

    const scrollRef = useRef(null)

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

    useEffect(() => {
        commentsRequest(`${appURL}/post-comments/${post.id}`)
    }, [])

    return (
        <>
            <UseInfiniteScroll request={commentsRequest} nextPageUrl={nextPageUrl}
                childrenClassNames="max-h-[55vh] pb-[100px]"
                ref={scrollRef}
            >
                {comments.map((comment) => {
                    return <Comment key={comment.id} user={comment.user} comment={comment} auth={auth} />
                })}
            </UseInfiniteScroll>

            <div className="absolute bottom-[14px] left-[14px] right-[15px]">
                <CommentsForm post={post} posts={posts} auth={auth} setComments={setComments} />
            </div>
        </>
    )
}

export function Comment({ user, comment, auth }) {
    const [isOpenOptions, setIsOpenOptions] = useState(false)
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        comment: '',
    });

    const deleteComment = (e) => {
        e.preventDefault();

        destroy(route('comments.destroy', comment.id))
    }

    const open = () => {
        setIsOpenOptions(true);
    };

    const close = () => {
        setIsOpenOptions(false);
    };

    return (
        <div className="mb-4 flex justify-between">
            <div className="flex">
                <Avatar size="sm" user={user} />

                <div className="px-4 py-1">
                    <span className="font-bold text-sm mr-1">
                        {user.name}
                    </span>

                    <span>
                        {comment.comment}
                    </span>
                </div>
            </div>

            <div onClick={open}>
                <svg aria-label="More options" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
            </div>

            {/* comment options */}
            <Modal show={isOpenOptions} onClose={close} maxWidth='sm'>
                {
                    user.id === auth.user.id && <div className="delete_comment border-b border-slate-100">
                        <form onSubmit={deleteComment} className="flex justify-center">
                            <TransparentButton disableAutofocus={true} className="h-full w-full text-red-700 p-4">
                                Delete
                            </TransparentButton>
                        </form>
                    </div>
                }
                <TransparentButton disableAutofocus={true} className="h-full w-full text-black-700 p-4" onClick={close}>
                    Cancel
                </TransparentButton>
            </Modal>
        </div>
    )
}