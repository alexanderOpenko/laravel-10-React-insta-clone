import Modal from "@/Components/Modal"
import { useForm } from "@inertiajs/react"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../Profile/Show"
import TransparentButton from "@/Components/TransparentButton"

export default function Comments({ comments }) {
    const auth = useContext(AuthContext)

    return (
        comments.map((comment) => {

            return <Comment userName={comment.user.name} comment={comment.comment} commentId={comment.id} userId={comment.user.id} auth={auth} />
        })
    )
}

export function Comment({ userName, comment, commentId, userId, auth }) {
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

        destroy(route('comments.destroy', commentId))
    }

    const open = () => {
        setIsOpenOptions(true);
    };

    const close = () => {
        setIsOpenOptions(false);
    };

    return (
        <div className="mb-4">
            <p>
                {userName} {comment}
            </p>

            <div onClick={open}>
                <svg aria-label="More options" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
            </div>

            <Modal show={isOpenOptions} onClose={close} maxWidth='sm'>
                {
                    userId === auth.user.id && <div className="delete_comment border-b border-slate-100">
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