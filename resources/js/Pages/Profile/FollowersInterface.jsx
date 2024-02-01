import { useContext } from "react"
import { LoadUsersContext } from "./LoadedUsersList"
import { appURL, strPlural } from "@/services"
import classNames from "classnames"

export default function FollowersInterface({ user, isMobile = false }) {
    const { setIsOpenUsersList, usersListRequest } = useContext(LoadUsersContext)

    const usersReuestHandler = (path) => {
        usersListRequest(`${appURL}/${path}/${user.id}`)
        setIsOpenUsersList(true)
    }

    const classes = classNames({
        "flex space-x-6": !isMobile,
        "flex w-1/2 justify-between": isMobile
    })

    const itemClasses = classNames({
        "flex flex-col items-center": isMobile,
        "cursor-pointer": true
    })

    return <div className={classes}>
        <div onClick={() => usersReuestHandler('followers')}
            className={itemClasses}
        >   
            <span>
                { `${user.followers_count} ` }
            </span>

            <span className="font-normal">
                {strPlural('folower', user.followers_count).split(' ')[1]}
            </span>
        </div>

        <div onClick={() => usersReuestHandler('following')}
            className={itemClasses}
        >
            {user.following_count} <span className="font-normal"> following </span>
        </div>
    </div>
}