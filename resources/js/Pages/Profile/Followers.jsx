import { useContext, useState } from "react"
import { strPlural } from '@/services';
import Modal from "@/Components/Modal";
import Avatar from "@/Components/Avatar";
import Unfollow from "./Unfollow";
import Follow from "./Follow";
import { AuthContext } from "./Show";

const appURL = import.meta.env.VITE_APP_URL;

export default function Followers({followers_count, following_count, user_id}) {
    const auth = useContext(AuthContext)
    console.log(auth, 'auth');
    const [followersList, setFollowersList] = useState([])
    const [isOpenFollowersList, setIsOpenFollowersList] = useState(false)

    const followersRequest = async (url) => {
        const resp = await fetch(url)
        const json = await resp.json()

        console.log(json);
         
        setFollowersList(json.data)
        setIsOpenFollowersList(true)
    }

    const closeFollowersListModal = () => {
        setIsOpenFollowersList(false)
    }

    return (
        <div>
            <div className="flex space-x-6">
                <div onClick={() => !!followers_count && followersRequest(`${appURL}/followers/${user_id}`)}
                    className="cursor-pointer"
                >
                    {strPlural('folower', followers_count)}
                </div>

                <div onClick={() => !!following_count && followersRequest(`${appURL}/following/${user_id}`)}
                    className="cursor-pointer"
                >
                    {following_count} following
                </div>
            </div>

            <Modal maxWidth="md" show={isOpenFollowersList} onClose={closeFollowersListModal}>
                <div className="followers_list">
                    <div className="border-b text-center p-3 font-medium">
                        Followers
                    </div>

                    {followersList.map((el) => {
                        return <div className="flex items-center p-4 justify-between">
                            <div className="flex items-center">
                                <Avatar size='sm' user={el.user} divClassName="mr-4"/>

                                {el.user.name}
                            </div>

                            {
                                el.authUserFollowed ? <Unfollow user={auth.user.id} follower={el.user.id}/>
                            :
                                <Follow user={auth.user && auth.user.id} following_id={el.user.id}/>
                            }
                        </div>
                    })}
                </div>
            </Modal>
        </div>
    )
}