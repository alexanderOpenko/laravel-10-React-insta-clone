import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from '@inertiajs/react';
import Comments from "./Comment";
import { Comment} from "./Comment";

export default function ShowPostModal(props) {
    const { post } = props
    const { public_url } = usePage().props
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

    const submitComment = (e) => {
        e.preventDefault();

        create(route('posts.comments.store', props.post.id))
    }

    return <Modal {...props}>
        <div className="flex">
            {
                !!post.images && <div
                    className="w-full max-w-3xl relative pt-59 bg-black	"
                >
                    <img className="w-full absolute object-contain top-0 h-full" src={public_url + "/" + post.images[0].image_path} />
                </div>
            }

            <div className="w-full max-w-md">
                <div className="post-user border-b border-slate-100 border-solid p-4 flex justify-between">
                    <div>
                        {post.user.name}
                    </div>

                    <div>
                        <svg aria-label="More options" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                    </div>
                </div>

                <div className="post-message p-4">
                    {
                        !!post.message && 
                        <p>{post.user.name} {post.message}</p>
                    }

                    {
                        !!post.post_comments && 
                        <div className="post-comments">
                            <Comments comments={post.post_comments}/>
                        </div>
                    }

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
            </div>
        </div>
    </Modal>
}
