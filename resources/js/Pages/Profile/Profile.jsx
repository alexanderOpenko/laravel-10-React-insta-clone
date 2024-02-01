import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import CreatePost from '../../Components/Post/Create';
import { useEffect, useState } from 'react';
import PostsList from '../../Components/Post/PostsList';
import ProfileInfo from './ProfileInfo';
import PrimaryButton from '@/Components/PrimaryButton';
import CounterPanel from '@/Components/Profile/CounterPanel';

const appURL = import.meta.env.VITE_APP_URL;

export default function Profile({ auth, user }) {
    const [showPostCreateForm, setShowPostCreateForm] = useState(false)
    const [posts, setPosts] = useState([])
    const [totalPosts, setTotalPosts] = useState(0)
    const [nextPageUrl, setNextPageUrl] = useState('')

    const userPostsRequest = async (url) => {
        const resp = await fetch(url)
        const json = await resp.json()

        setTotalPosts(json.total)
        setNextPageUrl(json.next_page_url)
        setPosts([...posts, ...json.data]);
    }

    useEffect(() => {
        userPostsRequest(`${appURL}/users/${user.id}/posts`)
    }, [])

    const openPostCreateForm = () => {
        setShowPostCreateForm(true);
    }

    const closePostCreateForm = () => {
        setShowPostCreateForm(false);
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <Content>
                <div className='px-3 lg:p-0'>
                    <ProfileInfo totalPosts={totalPosts} user={user} auth={auth} />

                    {
                        auth.user?.id == user?.id && <div>
                            <PrimaryButton onClick={openPostCreateForm} className='mb-5 lg:mb-10'>
                                Add Post
                            </PrimaryButton>

                            {showPostCreateForm ? <CreatePost user={user} show={showPostCreateForm} onClose={closePostCreateForm} /> : null}
                        </div>
                    }
                </div>

                <CounterPanel
                    user={user}
                    totalPosts={totalPosts}
                    styleClass="border-y border-slate-300 !mb-0 py-3 flex md:hidden justify-around"
                    isMobile={true}
                />

                {
                    !!posts &&
                    <PostsList
                        postsRequest={userPostsRequest}
                        nextPageUrl={nextPageUrl}
                        posts={posts}
                    />
                }
            </Content>

        </AuthenticatedLayout>
    )
}