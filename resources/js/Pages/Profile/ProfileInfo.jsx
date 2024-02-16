import { Link, usePage } from "@inertiajs/react";
import ProfileAvatar from "./Partials/ProfileAvatar";
import dayjs from 'dayjs';
import PrimaryButton from '@/Components/PrimaryButton';
import Unfollow from './Unfollow';
import Follow from "./Follow";
import CounterPanel from "@/Components/Profile/CounterPanel";
import classNames from "classnames";

export default function ProfileInfo({ user, auth, totalPosts }) {
    const { public_url } = usePage().props

    const nameClasses = classNames({
        "font-medium text-xl order-1 md:col-span-1 flex items-center justify-between": true,
        "!col-span-2": !auth.guest
    })

    return <div className='profile-info mb-5 lg:mb-10'>
        <div className='flex'>
            <ProfileAvatar user={user} />
            <div className="w-full md:w-auto">
                <div className="mt-4 md:mt-0 grid grid-cols-2">
                    <div className={nameClasses}>
                        <h1>
                            {user.name}
                        </h1>

                        {
                            !auth.guest &&
                            <Link href={route('profile.edit')}>
                                <svg aria-label="Options" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <title>Options</title>
                                    <circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                                    <path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                                </svg>
                            </Link>
                        }
                    </div>

                    <div className="flex order-3 md:order-2 mt-4 md:mt-0 col-span-2 md:col-span-1">
                        {(auth.guest && auth.following) && <Unfollow
                            fullWidth="w-full"
                            user={auth.user && auth.user.id}
                            follower={user.id}
                        />}

                        {(auth.guest && !auth.following) && <Follow
                            fullWidth="w-full"
                            user={auth.user && auth.user.id}
                            following_id={user.id} />
                        }

                        {
                            auth.user?.id !== user.id && <PrimaryButton className="ml-4 w-full">
                                <Link href={route('chat.index', user.id)}>
                                    Message
                                </Link>
                            </PrimaryButton>
                        }
                    </div>

                    <div className="col-span-2 hidden md:flex order-2 mt-2">
                        <CounterPanel user={user} totalPosts={totalPosts} />
                    </div>

                    {/* bio */}
                    {
                        (user.biography || user.birthday) && <div className="mt-4 col-span-2 order-2 md:order-4">
                            {
                                user.birthday && <div className='font-medium mb-3 flex items-center'>
                                    <div className='max-w-[42px] mr-3'>
                                        <img src={public_url + '/' + 'calendar.png'} />
                                    </div>

                                    <div>
                                        {dayjs(user.birthday).format('MMM D YYYY')}
                                    </div>
                                </div>
                            }

                            {
                                user.biography && <div className="max-w-xs leading-4 font-light">
                                    {user.biography}
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
}