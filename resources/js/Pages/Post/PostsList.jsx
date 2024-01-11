import { usePage } from "@inertiajs/react"
import { useState, useEffect, useRef } from "react"
import ShowPostModal from '../Post/Show';
import { UseInfiniteScroll } from "@/infinitePaginationHook";

export default function PostsList({ posts, postsRequest, nextPageUrl, grid = 'default' }) {
    const { public_url } = usePage().props
    const [post, setPost] = useState([])
    const [isOpenPost, setIsOpenPost] = useState(false)

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
                    maxWidth='7xl'
                />
                : null
        }

        {
            posts.map((post) => {
                return <div key={post.id} className='cursor-pointer'
                    onClick={() => showPost(post)}
                >
                    <img src={public_url + "/" + post.images[0].image_path} className="object-cover h-full"/>
                </div>
            })
        }

        <UseInfiniteScroll request={postsRequest} nextPageUrl={nextPageUrl} />
    </div>
}