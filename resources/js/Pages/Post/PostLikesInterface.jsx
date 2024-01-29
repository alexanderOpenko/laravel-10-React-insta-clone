import { useContext } from "react"
import { LoadUsersContext } from "../Profile/LoadedUsersList"
import { appURL } from "@/services"
import { strPlural } from "@/services";

export default function PostLikesInterface({ postLickesCount, post }) {
    const { setIsOpenUsersList, usersListRequest } = useContext(LoadUsersContext)

    const usersReuestHandler = () => {
        usersListRequest(`${appURL}/like/likers/${post.id}`)
        setIsOpenUsersList(true)
    }

    return <div onClick={() => usersReuestHandler()}>
        {strPlural('like', postLickesCount)}
    </div>
}