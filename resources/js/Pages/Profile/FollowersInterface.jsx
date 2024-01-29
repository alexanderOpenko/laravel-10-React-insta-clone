import { useContext } from "react"
import { LoadUsersContext } from "./LoadedUsersList"
import { appURL, strPlural } from "@/services"

export default function FollowersInterface({ user }) {
    const { setIsOpenUsersList, usersListRequest } = useContext(LoadUsersContext)

    const usersReuestHandler = (path) => {
        usersListRequest(`${appURL}/${path}/${user.id}`)
        setIsOpenUsersList(true)
    }

    return <div className="flex space-x-6">
        <div onClick={() => usersReuestHandler('followers')}
            className="cursor-pointer"
        >
            {strPlural('folower', user.followers_count)}
        </div>

        <div onClick={() => usersReuestHandler('following')}
            className="cursor-pointer"
        >
            {user.following_count} following
        </div>
    </div>
}