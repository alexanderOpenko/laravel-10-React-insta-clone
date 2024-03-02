import Modal from "@/Components/Modal"
import { Link, useForm } from "@inertiajs/react"
import { useState, useEffect, useRef } from "react"
import TransparentButton from "@/Components/TransparentButton"
import Avatar from "@/Components/Avatar"
import UseInfiniteScroll from "@/Components/infinitePaginationHook"
import { appURL } from "@/services";
import classNames from "classnames"
import ExpandingText from "./ExpandingText"
import CreatedAt from "../CreatedAt"
import PostMessage from "./PostMessage"

export default function Comments({ post, comments, commentsRequest, nextPageUrl, auth }) {
    const scrollRef = useRef(null)

    useEffect(() => {
        commentsRequest(`${appURL}/post-comments/${post.id}`)
    }, [])

    return (
        <>
            <UseInfiniteScroll request={commentsRequest} nextPageUrl={nextPageUrl}
                childrenClassNames="max-h-[460px] h-full"
                ref={scrollRef}
            >
                <div className="post-message">
                    {
                        !!post.message &&
                        <div className="flex mb-4">
                            <Avatar size="sm" user={post.user} divClassName="w-[13%]" />

                            <div className="pl-3 py-1 w-[87%]">
                                <PostMessage name={post.user.name} userId={post.user.id} message={post.message} createdAt={post.created_at} />
                            </div>
                        </div>
                    }
                </div>

                {comments.map((comment) => {
                    return <Comment key={comment.id} user={comment.user} comment={comment} auth={auth} />
                })}
            </UseInfiniteScroll>
        </>
    )
}

export function Comment({ user, comment, auth }) {
    const [isOpenOptions, setIsOpenOptions] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
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
        close()
        setIsDeleted(true)
    }

    const open = () => {
        setIsOpenOptions(true);
    };

    const close = () => {
        setIsOpenOptions(false);
    };

    const classes = classNames({
        "mb-4 relative": true,
        "hidden": isDeleted
    })

    return (
        <div className={classes}>
            <div className="flex">
                <Avatar size="sm" user={user} divClassName="w-[13%]" />

                <div className="pl-3 py-1 w-[75%]">
                    <div className="font-bold text-sm mr-1 float-left">
                        <Link href={route('profile.show', user.id)}>
                            {user.name}
                        </Link>
                    </div>

                    <ExpandingText text={comment.comment} className="leading-5" />

                    <CreatedAt createdAt={comment.created_at} />
                </div>
            </div>

            <div onClick={open} className="absolute right-3 top-0">
                <svg aria-label="More options" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
            </div>

            {/* comment options */}
            <Modal show={isOpenOptions} onClose={close} maxWidth='sm' dialogClasses="!h-auto">
                {
                    (auth.user && user.id === auth.user.id) && <div className="delete_comment border-b border-slate-100">
                        <form onSubmit={deleteComment} className="flex justify-center">
                            <TransparentButton disableAutofocus={true} className="h-full w-full text-red-700 p-4">
                                Delete comment
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