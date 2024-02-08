import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import axios from "axios"
import { useForm } from "@inertiajs/react"
import Likes from "./Post/Likes";

export default function CommentsForm ({ post, posts, auth, setComments }) {
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
            post: post.id,
            comment: data.comment
        }))

        const comment = resp.data
        comment.user = auth.user
        console.log(comment, 'comment');
        const commentArr = [comment]
        setComments(prevComments => {return [...commentArr, ...prevComments]})
    }

    return (
        <div className="post_comments_form mt-5">
            <Likes post={post} posts={posts}/> 

            <form onSubmit={submitComment} className="flex">
                <div className="mr-5 w-full">
                    <TextInput
                        type='text'
                        name='comment'
                        className="w-full"
                        value={data.comment}
                        onChange={(e) => { setData('comment', e.target.value) }}
                        placeholder="Add a comment"
                    />

                    <InputError message={errors.comment} className="mt-2" />
                </div>

                <PrimaryButton disabled={processing}>
                    Post
                </PrimaryButton>
            </form>
        </div>
    )
}