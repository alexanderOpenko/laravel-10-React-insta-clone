import { usePage } from "@inertiajs/react"
import { Link } from "@inertiajs/react"
import Avatar from "@/Components/Avatar"
import Follow from "../Profile/Follow"
import Unfollow from "../Profile/Unfollow"

export default function UserCard({ user, authUserFollowed, setUsersList = null }) {
    const { auth } = usePage().props

    return <div className="flex items-center py-3 px-4 justify-between">
    <div className="flex items-center">
        <Avatar size='sm' user={user} divClassName="mr-4" />

        <Link href={route('profile.show',  user.id)} className="text-sm md:text-base truncate max-w-[130px] md:max-w-full">
            {user.name} 
        </Link>
    </div>

    {(auth.user && auth.user.id !==  user.id) && <>{
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