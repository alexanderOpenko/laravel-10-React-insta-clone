import Modal from "@/Components/Modal"
import { useForm } from "@inertiajs/react"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../Profile/Show"
import TransparentButton from "@/Components/TransparentButton"
import Avatar from "@/Components/Avatar"

export default function Comments({ comments }) {
    const auth = useContext(AuthContext)

    return (
        comments.map((comment) => {

            return <Comment user={comment.user} comment={comment} auth={auth} />
        })
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
        <div className="mb-4">
            <div className="flex">
                <Avatar size="sm" user={user} />

                <div className="px-4 py-1">
                    <p>
                        {user.name} {comment.comment}
                    </p>
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