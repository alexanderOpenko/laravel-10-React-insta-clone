import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PostsList from '../Components/Post/PostsList';
import { appURL } from '@/services';
import { useState, useEffect } from 'react';

export default function Home({ auth }) {
    const [nextPageUrl, setNextPageUrl] = useState('')
    const [posts, setPosts] = useState([])

    const postsRequest = async (url) => {
        const resp = await fetch(url)
        const json = await resp.json()

        setNextPageUrl(json.next_page_url)
        setPosts([...posts, ...json.data]);
    }

    useEffect(() => {
        postsRequest(`${appURL}/home-posts`)
    }, [])

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
        >
            <div className='w-full h-full md:max-w-lg mx-auto'>
                {
                    posts.length ? <PostsList
                        posts={posts}
                        postsRequest={postsRequest}
                        nextPageUrl={nextPageUrl}
                        grid="vertical"
                    />
                        :
                    <div className='h-full flex items-center'>
                        <h1 className='font-medium text-lg'>🔔 Stay Updated! Subscribe to See New Posts 🔔</h1>
                    </div>
                }
            </div>
        </AuthenticatedLayout>
    );
}
