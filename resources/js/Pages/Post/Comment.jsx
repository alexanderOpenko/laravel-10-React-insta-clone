import Modal from "@/Components/Modal"
import { useForm, router, usePage } from "@inertiajs/react"
import { useState, useEffect } from "react"
import TransparentButton from "@/Components/TransparentButton"
import Avatar from "@/Components/Avatar"
import { UseInfiniteScroll } from "@/infinitePaginationHook"
import { appURL } from "@/services";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import axios from "axios"

export default function Comments({ postId }) {
    const { auth } = usePage().props
    const [comments, setComments] = useState([])
    const [nextPageUrl, setNextPageUrl] = useState('')

    const {
        data,
        setData,
        post: create,
        processing,
        reset,
        errors,
    } = useForm({
        comment: '',
    });

    const submitComment = async (e) => {
        e.preventDefault();

        const resp = await axios.post(route('posts.comments.store', {
            post: postId,
            comment: data.comment
        }))

        const comment = resp.data
        comment.user = auth.user
        const commentArr = [comment]
        setComments(prevComments => {return [...commentArr, ...prevComments]})
    }

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
        commentsRequest(`${appURL}/post-comments/${postId}`)
    }, [])

    return (
        <div>
            <UseInfiniteScroll request={commentsRequest} nextPageUrl={nextPageUrl}>
                {comments.map((comment) => {
                    return <Comment key={comment.id} user={comment.user} comment={comment} auth={auth} />
                })}
            </UseInfiniteScroll>

            <div className="post_comments_form">
                <form onSubmit={submitComment}>
                    <div>
                        <TextInput
                            type='text'
                            name='comment'
                            value={data.comment}
                            onChange={(e) => { setData('comment', e.target.value) }}
                            placeholder="Add a comment"
                        />

                        <InputError message={errors.comment} className="mt-2" />
                    </div>

                    <PrimaryButton className="ms-3" disabled={processing}>
                        Post
                    </PrimaryButton>
                </form>
            </div>
        </div>
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