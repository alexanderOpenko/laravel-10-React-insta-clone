import TransparentButton from "@/Components/TransparentButton";
import classNames from "classnames";
import LoadedUsersList from "@/Pages/Profile/LoadedUsersList";
import PostLikesInterface from "@/Components/Post/PostLikesInterface";
import { useForm } from "@inertiajs/react"

export default function Likes ({ post, posts }) {
    const { post: store, processing } = useForm()

    const likeRequest = (e) => {
        e.preventDefault()
        store(route('like.index', post.id), {
            preserveScroll: true,
            onSuccess: () => {
                if (!post.liked) {
                    posts[posts.indexOf(post)].liked = true
                    posts[posts.indexOf(post)].likes_count = post.likes_count + 1
                } else {
                    posts[posts.indexOf(post)].liked = false
                    posts[posts.indexOf(post)].likes_count = post.likes_count - 1
                }
            }
        })
    }

    const likeBTNclassNames = classNames({
        'far': !post.liked,
        'fa text-red-500': post.liked,
        'fa-heart text-[23px]': true,
    })

    return <div>
        <div className="py-2 cursor-pointer">
            <form onSubmit={likeRequest}>
                <TransparentButton disabled={processing}>
                    <i className={likeBTNclassNames} aria-hidden="true"></i>
                </TransparentButton>
            </form>
        </div>

        {
            !!post.likes_count &&
            <LoadedUsersList heading="Likes">
                <PostLikesInterface postLikesCount={post.likes_count} post={post} />
            </LoadedUsersList>
        }
    </div>
}