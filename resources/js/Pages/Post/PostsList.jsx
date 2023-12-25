import { usePage } from "@inertiajs/react"
import { useState, useEffect, useRef } from "react"
import ShowPostModal from '../Post/Show';

export default function PostsList({ posts, userPostsRequest, nextPageUrl }) {
    const { public_url } = usePage().props
    const [post, setPost] = useState([])
    const [isOpenPost, setIsOpenPost] = useState(false)
    let usedUrls = []

    useEffect(() => {
        if (post) {
            setPost(posts.find((el) => post.id === el.id))
        }

        const onScroll = (e) => {
            const scrollTop = Math.round(window.scrollY)
            const scrollHeight = document.body.scrollHeight
            const clientHeight = window.innerHeight

            if (scrollTop + clientHeight >= scrollHeight - 50 && !usedUrls.includes(nextPageUrl)) {
                if (nextPageUrl) {
                    userPostsRequest(nextPageUrl)
                    usedUrls.push(nextPageUrl)
                }
            }
        };

        document.addEventListener('scroll', onScroll);

        return () => {
            document.removeEventListener('scroll', onScroll);
        };

    }, [nextPageUrl]);

    const showPost = (post) => {
        setPost(post)
        setIsOpenPost(true);
    };

    const closePost = () => {
        setIsOpenPost(false);
    };

    return <div className='user-posts gap-x-2 gap-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
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
    </div>
}