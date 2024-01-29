import { useForm, usePage } from "@inertiajs/react"
import { useState, useEffect, useRef } from "react"
import ShowPostModal from '../Post/Show';
import UseInfiniteScroll from "@/infinitePaginationHook";
import { strPlural } from "@/services";
import PostHeader from "./PostHeader";
import TransparentButton from "@/Components/TransparentButton";
import classNames from "classnames";
import LoadedUsersList from "../Profile/LoadedUsersList";
import PostLikesInterface from "./PostLikesInterface";

export default function PostsList({ posts, postsRequest, nextPageUrl, grid = 'default' }) {
    const [isOpenPost, setIsOpenPost] = useState(false)

    const [post, setPost] = useState([])

    const showPost = (post) => {
        setPost(post)
        setIsOpenPost(true);
    };

    const closePost = () => {
        setIsOpenPost(false);
    };

    const gridClasses = {
        'default': 'gap-x-2 gap-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        'home': 'gap-y-4 grid grid-cols-1'
    }[grid]

    return <div className={'user-posts ' + gridClasses}>
        {
            isOpenPost ?
                <ShowPostModal
                    post={post}
                    show={isOpenPost}
                    onClose={closePost}
                    maxWidth='6xl'
                />
                : null
        }

        {
            posts.map((post) => {
                return <Post post={post} grid={grid} showPost={showPost}/>
            })
        }

        <UseInfiniteScroll request={postsRequest} nextPageUrl={nextPageUrl} />
    </div>
}

const Post = ({ post, grid, showPost }) => {
    const { public_url } = usePage().props
    const [ isLiked, setIsLiked ] = useState(false)
    const [ postLickesCount, setPostLickesCount ] = useState(0)
    const { post: store } = useForm()

    const likeRequest = (e) => {
        e.preventDefault()
        store(route('like.index', post.id), {
            preserveScroll: true,
            onSuccess: () => {
                setIsLiked( prevIsLiked => !prevIsLiked) 
            
                if (!isLiked) {
                    setPostLickesCount(postLickesCount + 1)
                } else {
                    setPostLickesCount(postLickesCount - 1)
                }
            }
        })
    }

    useEffect(() => {
        //likes is array of one object that contain id of current user if it liked
        if (post.likes?.length) {
            setIsLiked(true)
        }

        if (post.likes_count) {
            setPostLickesCount(post.likes_count)
        }
    }, [])

     const likeBTNclassNames = classNames({
        'far': !isLiked,
        'fa text-red-500': isLiked,
        'fa-heart text-[23px]': true,
    })

    return <div key={post.id} className={grid !== 'home' && 'cursor-pointer'}>
    {grid === 'home' &&
        <PostHeader post={post} classNames="px-0" />
    }

    <div onClick={ () => showPost(post) } className="cursor-pointer">
        <img src={public_url + "/" + post.images[0].image_path} className="object-cover h-full" />
    </div>

    {
        grid === 'home' && <>
            <div className="flex leading-none mt-1">
                <div className="py-2 cursor-pointer">
                    <form onSubmit={likeRequest}>
                    <TransparentButton>
                        <i className={likeBTNclassNames} aria-hidden="true"></i>
                    </TransparentButton>
                    </form>
                </div>

                <div className="p-2 cursor-pointer" onClick={() => showPost(post)}>
                    <i className="far fa-comment text-[23px]" style={{ "transform": "rotateY(180deg)" }} aria-hidden="true"></i>
                </div>
            </div>

            {
                !!postLickesCount &&
                <LoadedUsersList heading="Likes">
                    <PostLikesInterface postLickesCount={postLickesCount} post={post}/>
                </LoadedUsersList>
            }

            <div className="leading-none">
                <span className="font-bold text-sm mr-1 cursor-pointer">
                    {post.user.name}
                </span>

                <span>
                    {post.message}
                </span>
            </div>

            {!!post.post_comments_count &&
                <div className="mt-2 font-normal text-gray-500 text-sm cursor-pointer leading-none"
                    onClick={() => showPost(post)}>
                    View
                    {
                        post.post_comments_count > 1 ?
                            ' all '
                            :
                            ' a '
                    }

                    {strPlural('comment', post.post_comments_count)}
                </div>
            }
        </>
    }
</div>
}