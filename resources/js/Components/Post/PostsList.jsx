import { router, usePage } from "@inertiajs/react"
import { useEffect, useRef, useState } from "react"
import ShowPostModal from './Show';
import UseInfiniteScroll from "@/infinitePaginationHook";
import { strPlural } from "@/services";
import PostHeader from "./PostHeader";
import Likes from "@/Components/Post/Likes";
import classNames from "classnames";
import PostMessage from "./PostMessage";

export default function PostsList({ posts, postsRequest, nextPageUrl, grid = 'default' }) {
    const [isOpenPost, setIsOpenPost] = useState(false)
    const [gridValue, setGridValue] = useState(grid)
    const [postToSctoll, setPostToScroll] = useState(null)
    const [post, setPost] = useState([])

    const showPost = (post) => {
        setPost(post)
        setIsOpenPost(true);
    }

    const closePost = () => {
        setIsOpenPost(false);
    }

    const postMobileClickHandler = (postId) => {
        setGridValue('vertical')
        setPostToScroll(postId)
    }

    const gridClasses = {
        'default': 'gap-x-[1px] md:gap-x-1 gap-y-[1px] md:gap-y-1 grid grid-cols-3',
        'vertical': 'gap-y-4 grid grid-cols-1'
    }[gridValue]

    return <>
        <div className={'user-posts ' + gridClasses}>
            {
                isOpenPost ?
                    <ShowPostModal
                        post={post}
                        posts={posts}
                        show={isOpenPost}
                        onClose={closePost}
                        maxWidth='5xl'
                        dialogClasses='max-h-[97%] md:max-h-148'
                    />
                    : null
            }

            {
                posts.map((post) => {
                    return <div className="relative" key={post.id}>
                        <Post
                            post={post}
                            posts={posts}
                            grid={gridValue}
                            showPost={showPost}
                            postMobileClickHandler={postMobileClickHandler}
                            postToSctoll={postToSctoll}
                        />
                    </div>
                })
            }

        </div>
        <UseInfiniteScroll request={postsRequest} nextPageUrl={nextPageUrl} />
    </>
}

const Post = ({ post, posts, grid, showPost, postMobileClickHandler, postToSctoll }) => {
    const { public_url } = usePage().props

    const postRef = useRef(null)

    const classes = classNames({
        "h-full": grid !== 'vertical'
    })

    const mobileClickHandler = (postId) => {
        postMobileClickHandler(postId)
    }

    useEffect(() => {
        if (grid === 'vertical' && postToSctoll === post.id) {
            postRef.current.scrollIntoView()
        }
    }, [postToSctoll]);

    return <div ref={postRef}>
        {
            grid === 'default' &&
            <div className="absolute top-0 right-0 bottom-0 left-0 md:hidden cursor-pointer"
                onClick={() => mobileClickHandler(post.id)}
            >
            </div>
        }

        {grid === 'vertical' &&
            <PostHeader post={post} />
        }

        <div className="absolute top-0 right-0 bottom-0 left-0 hidden md:block cursor-pointer" onClick={() => showPost(post)}>
        </div>

        <div className={classes}>
            <img src={public_url + "/" + post.images[0].image_path} className="object-cover h-full" />
        </div>

        {
            grid === 'vertical' && <>
                <div className="px-3 md:px-0">
                    <div className="flex mt-1 mb-2">
                        <Likes post={post} posts={posts} />

                        <div className="p-2 cursor-pointer" onClick={() => showPost(post)}>
                            <i className="far fa-comment text-[23px]" style={{ "transform": "rotateY(180deg)" }} aria-hidden="true"></i>
                        </div>
                    </div>

                    <div className="leading-none">
                        <PostMessage name={post.user.name} userId={post.user.id} message={post.message} createdAt={post.created_at}/>
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
                </div>
            </>
        }
    </div>
}

