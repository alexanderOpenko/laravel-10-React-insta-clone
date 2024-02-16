import { useContext } from "react"
import { LoadUsersContext } from "../../Pages/Profile/LoadedUsersList"
import { appURL } from "@/services"
import { strPlural } from "@/services";

export default function PostLikesInterface({ postLikesCount, post }) {
    const { setIsOpenUsersList, usersListRequest } = useContext(LoadUsersContext)

    const usersReuestHandler = () => {
        usersListRequest(`${appURL}/like/likers/${post.id}`)
        setIsOpenUsersList(true)
    }

    return <div onClick={() => usersReuestHandler()} className="cursor-pointer">
        {strPlural('like', postLikesCount)}
    </div>
}

