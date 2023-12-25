import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import CreatePost from '../Post/Create';
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import PostsList from '../Post/PostsList';

import { reloadIfUpdatedTrick } from '@/reloadOnUpdateTrick';
import ProfileInfo from './ProfileInfo';
import PrimaryButton from '@/Components/PrimaryButton';

export const AuthContext = createContext(null);
const appURL = import.meta.env.VITE_APP_URL;

export default function Show({ auth, user }) {
    const [showPostCreateForm, setShowPostCreateForm] = useState(false)
    const [posts, setPosts] = useState([])
    const [totalPosts, setTotalPosts] = useState(0)
    const [nextPageUrl, setNextPageUrl] = useState('')

    const userPostsRequest = async (url) => {
        const resp = await fetch(url)
        const json = await resp.json()

        setTotalPosts(json.total)
        setNextPageUrl(json.next_page_url)
        console.log(json, 'json');
        setPosts([...posts, ...json.data]);
    }

    useEffect(() => {
        console.log('useEffec');
        reloadIfUpdatedTrick(user.id)
        userPostsRequest(`${appURL}/users/${user.id}/posts`)
    }, [])

    const openPostCreateForm = () => {
        setShowPostCreateForm(true);
    };

    const closePostCreateForm = () => {
        setShowPostCreateForm(false);
    };

    return (
        <AuthContext.Provider value={auth}>
            <AuthenticatedLayout
                auth={auth}
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
            >
                <Head title="Profile" />

                <Content>
                    <ProfileInfo totalPosts={totalPosts} user={user} auth={auth} />

                    <div>
                        <PrimaryButton onClick={openPostCreateForm} className='my-6'>
                            Add Post
                        </PrimaryButton>

                        {showPostCreateForm ? <CreatePost user={user} show={showPostCreateForm} onClose={closePostCreateForm} /> : null}
                    </div>

                    {
                        !!posts &&
                        <PostsList
                            userPostsRequest={userPostsRequest}
                            nextPageUrl={nextPageUrl}
                            posts={posts}
                        />
                    }
                </Content>

            </AuthenticatedLayout>
        </AuthContext.Provider >
    )
}