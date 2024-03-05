import { usePage } from "@inertiajs/react"
import { Link } from "@inertiajs/react"
import Avatar from "@/Components/Avatar"
import Follow from "../Profile/Follow"
import Unfollow from "../Profile/Unfollow"

export default function UserCard({ user, authUserFollowed, setUsersList = null, isMessageButton = false }) {
    const { auth } = usePage().props

    return <div className="flex items-center py-3 px-4 justify-between">
        <div className="flex items-center relative">
            <Avatar size='sm' user={user} divClassName="mr-4" isLinkable={false} />

            <Link href={!isMessageButton ? route('profile.show', user.id) : route('chat.index', user.id)} className="text-sm bottom-0 md:text-base truncate max-w-[130px] md:max-w-full absolute top-0 left-0 right-0">
            </Link>

            {user.name}
        </div>

        {(auth.user && auth.user.id !== user.id && !isMessageButton) && <>{
            authUserFollowed ? <Unfollow
                user={auth.user.id}
                follower={user.id}
                setUsersList={setUsersList}
            />
                :
                <Follow
                    user={auth.user?.id}
                    following_id={user.id}
                    setUsersList={setUsersList}
                />
        }</>
        }
    </div>
}