import Modal from "@/Components/Modal"
import { useForm } from "@inertiajs/react"
import { useState, useEffect, useRef } from "react"
import TransparentButton from "@/Components/TransparentButton"
import Avatar from "@/Components/Avatar"
import UseInfiniteScroll from "@/infinitePaginationHook"
import { appURL } from "@/services";
import classNames from "classnames"
import ExpandingText from "./ExpandingText"

export default function Comments({ post, comments, commentsRequest, nextPageUrl, auth }) {
    const scrollRef = useRef(null)

    useEffect(() => {
        commentsRequest(`${appURL}/post-comments/${post.id}`)
    }, [])

    return (
        <>
            <UseInfiniteScroll request={commentsRequest} nextPageUrl={nextPageUrl}
                childrenClassNames="max-h-[400px] h-full"
                ref={scrollRef}
            >
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
                <Avatar size="sm" user={user} divClassName="w-[13%]"/>

                <div className="pl-3 py-1 w-[75%]">
                    <span className="font-bold text-sm mr-1">
                        {user.name}
                    </span>

                    <ExpandingText text={comment.comment}/>
                </div>
            </div>

            <div onClick={open} className="absolute right-3 top-0">
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