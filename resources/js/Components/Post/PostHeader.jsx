import Avatar from "@/Components/Avatar";
import { Link, usePage, useForm, router } from "@inertiajs/react";
import CreatedAt from "../CreatedAt";
import Modal from "../Modal";
import { useState } from "react";
import TransparentButton from "../TransparentButton";

export default function PostHeader({ post, classNames }) {
    const { auth } = usePage().props
    const [isOpenOptions, setIsOpenOptions] = useState(false)

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        post: '',
    });

    const open = () => {
        setIsOpenOptions(true);
    }

    const close = () => {
        setIsOpenOptions(false);
    }

    const deletePost = (e) => {
        e.preventDefault();

        destroy(route('users.posts.destroy', { user: auth.user.id, post: post.id }), {
            onSuccess: () => {
                router.visit(`/profile/${auth.user.id}`)            
            }
        })
        close()
    }

    return <div className={`post-user border-b border-slate-100 border-solid p-4 flex items-center justify-between ` + classNames}>
        <div className="flex items-center">
            <Avatar user={post.user} size="sm" divClassName="mr-4" />

            <div className="flex items-center">
                <div className="font-bold text-sm">
                    <Link href={route('profile.show', post.user.id)}>
                        {post.user.name}
                    </Link>
                </div>

                <code className="mx-2">&#8212;</code>

                <CreatedAt createdAt={post.created_at} />
            </div>
        </div>

        {(auth.user && auth.user.id === post.user.id) && <div onClick={open}>
            <svg aria-label="More options" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
        </div>}

        <Modal show={isOpenOptions} onClose={close} maxWidth='sm' dialogClasses="!h-auto">
                {
                    (auth.user && auth.user.id === post.user.id) && <div className="delete_comment border-b border-slate-100">
                        <form onSubmit={deletePost} className="flex justify-center">
                            <TransparentButton disableAutofocus={true} className="h-full w-full text-red-700 p-4">
                                Delete post
                            </TransparentButton>
                        </form>
                    </div>
                }
                <TransparentButton disableAutofocus={true} className="h-full w-full text-black-700 p-4" onClick={close}>
                    Cancel
                </TransparentButton>
            </Modal>
    </div>
}