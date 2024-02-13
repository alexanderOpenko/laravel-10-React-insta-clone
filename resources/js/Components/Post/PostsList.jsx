import { router, usePage } from "@inertiajs/react"
import { useState } from "react"
import ShowPostModal from './Show';
import UseInfiniteScroll from "@/infinitePaginationHook";
import { strPlural } from "@/services";
import PostHeader from "./PostHeader";
import Likes from "@/Components/Post/Likes";
import classNames from "classnames";

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
        'default': 'gap-x-1 gap-y-1 grid grid-cols-3',
        'home': 'gap-y-4 grid grid-cols-1'
    }[grid]

    return <>
        <div className={'user-posts ' + gridClasses}>
            {
                isOpenPost ?
                    <ShowPostModal
                        post={post}
                        posts={posts}
                        show={isOpenPost}
                        onClose={closePost}
                        maxWidth='6xl'
                    />
                    : null
            }

            {
                posts.map((post) => {
                    return <Post post={post} posts={posts} grid={grid} showPost={showPost} />
                })
            }

        </div>
        <UseInfiniteScroll request={postsRequest} nextPageUrl={nextPageUrl} />
    </>
}

const Post = ({ post, posts, grid, showPost }) => {
    const { public_url } = usePage().props

    const classes = classNames({
        "cursor-pointer": true,
        "h-full": grid !== 'home'
    })

    return <div key={post.id}>
        {grid === 'home' &&
            <PostHeader post={post} classNames="px-0" />
        }

        <div onClick={() => showPost(post)} className={classes}>
            <img src={public_url + "/" + post.images[0].image_path} className="object-cover h-full" />
        </div>

        {
            grid === 'home' && <>
                <div className="flex leading-none mt-1 mb-2">
                    <Likes post={post} posts={posts} />

                    <div className="p-2 cursor-pointer" onClick={() => showPost(post)}>
                        <i className="far fa-comment text-[23px]" style={{ "transform": "rotateY(180deg)" }} aria-hidden="true"></i>
                    </div>
                </div>


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

