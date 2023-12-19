import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import CreatePost from '../Post/Create';
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import PostsList from '../Post/PostsList';
import ProfileAvatar from './Partials/ProfileAvatar';
import dayjs from 'dayjs';
import PrimaryButton from '@/Components/PrimaryButton';
import { strPlural } from '@/services';
import Unfollow from './Unfollow';
import { handleSuccess, reloadIfUpdatedTrick } from '@/reloadOnUpdateTrick';

export const AuthContext = createContext(null);

export default function Show({ auth, user }) {
    const { public_url } = usePage().props
    const [showPostCreateForm, setShowPostCreateForm] = useState(false)

    useEffect(() => {
        reloadIfUpdatedTrick(user.id)
    }, [])

    const {
        post,
        processing
    } = useForm({
        user: auth.user.id
    })

    const followSubmit = (e) => {
        e.preventDefault()
        post(route('users.followers.store', { user: auth.user, following_id: user.id }), {
            onSuccess: () => {
                handleSuccess(user.id)
            }
        })
    }

    const openPostCreateForm = () => {
        setShowPostCreateForm(true);
    };

    const closePostCreateForm = () => {
        setShowPostCreateForm(false);
    };

    return (
        <AuthContext.Provider value={ auth }>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
            >
                <Head title="Profile" />

                <Content>
                    <div className='profile-info'>
                        <div className='flex'>
                            <div className='user-avatar mr-10'>
                                <ProfileAvatar user={user} />
                            </div>

                            <div>
                                {/* name and header */}
                                <div className='flex space-x-4 justify-between mb-4'>
                                    {!!user.name && <h1 className='font-medium text-xl'>
                                        {user.name}
                                    </h1>
                                    }

                                    {(auth.guest && auth.following) && <Unfollow 
                                        user={auth.user.id}
                                        follower={user.id}
                                    />}

                                    {(auth.guest && !auth.following) &&
                                        <form onSubmit={followSubmit}>
                                            <PrimaryButton className='bg-blue-600'>
                                                Follow
                                            </PrimaryButton>
                                        </form>
                                    }

                                    {!auth.guest &&
                                        <Link href={route('profile.edit')}>
                                            <svg aria-label="Options" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                                <title>Options</title>
                                                <circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                                                <path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                                            </svg>
                                        </Link>}
                                </div>

                                <div className='flex space-x-5 w-full font-medium text-lg mb-4'>
                                    <div>
                                        {strPlural('post', user.posts.length)}
                                    </div>

                                    <div>
                                        {strPlural('folower', user.followers.length)}
                                    </div>

                                    <div>
                                        {user.following.length} following
                                    </div>
                                </div>

                                {/* bio */}
                                {!!user.birthday && <div className='font-medium mb-3 flex items-center'>
                                    <div className='max-w-[42px] mr-3'>
                                        <img src={public_url + '/' + 'calendar.png'} />
                                    </div>

                                    <div>
                                        {dayjs(user.birthday).format('MMM D YYYY')}
                                    </div>
                                </div>
                                }

                                {!!user.biography && <div className="max-w-xs leading-4 font-light">
                                    {user.biography}
                                </div>
                                }
                            </div>
                        </div>
                    </div>

                    <div>
                        <div onClick={openPostCreateForm}>
                            Add Post
                        </div>

                        {showPostCreateForm ? <CreatePost user={user} show={showPostCreateForm} onClose={closePostCreateForm} /> : null}
                    </div>

                    {
                        !!user.posts &&
                        <PostsList
                            posts={user.posts}
                            user
                        />
                    }
                </Content>

            </AuthenticatedLayout>
        </AuthContext.Provider >
    )
}