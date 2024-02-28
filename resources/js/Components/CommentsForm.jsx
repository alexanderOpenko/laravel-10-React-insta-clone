import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import axios from "axios"
import { useForm } from "@inertiajs/react"
import Likes from "./Post/Likes";
import { useState } from "react";

export default function CommentsForm({ post, posts, auth, setComments }) {
    const [errors, setErrors] = useState('')
    const {
        data,
        setData,
        processing,
        reset,
    } = useForm({
        comment: '',
    });

    const submitComment = async (e) => {
        e.preventDefault();

        try {
            const resp = await axios.post(route('posts.comments.store', {
                post: post.id,
                comment: data.comment,
            }))
            reset("comment")

            const comment = resp.data
            comment.user = auth.user
            const commentArr = [comment]
            setComments(prevComments => { return [...commentArr, ...prevComments] })
        } catch (e) {
            setErrors(e.response.data.message);
        }
    }

    return (
        <div className="post_comments_form bg-white">
            <Likes post={post} posts={posts} />

            <form onSubmit={submitComment} className="flex items-start mt-2">
                <div className="mr-5 w-full">
                    <TextInput
                        type='text'
                        name='comment'
                        className="w-full"
                        value={data.comment}
                        onChange={(e) => { setData('comment', e.target.value) }}
                        placeholder="Add a comment"
                    />

                    {errors && <InputError message={errors} className="mt-2" />}
                </div>

                <PrimaryButton disabled={processing} className="!p-3">
                    Post
                </PrimaryButton>
            </form>
        </div>
    )
}