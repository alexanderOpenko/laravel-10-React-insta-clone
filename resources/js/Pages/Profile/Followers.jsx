import { useContext, useState, useRef } from "react"
import { strPlural } from '@/services';
import Modal from "@/Components/Modal";
import Avatar from "@/Components/Avatar";
import Unfollow from "./Unfollow";
import Follow from "./Follow";
import { AuthContext } from "./Profile";
import UseInfiniteScroll from "@/infinitePaginationHook";

const appURL = import.meta.env.VITE_APP_URL;

export default function Followers({ followers_count, following_count, user_id }) {
    const auth = useContext(AuthContext)
    const [followersList, setFollowersList] = useState([])
    const [isOpenFollowersList, setIsOpenFollowersList] = useState(false)
    const [nextPageUrl, setNextPageUrl] = useState('')

    const scrollRef = useRef(null)

    async function followersRequest(url) {
        const resp = await fetch(url)
        const json = await resp.json()

        setFollowersList([...followersList, ...json.data])
        setNextPageUrl(json.next_page_url)
        setIsOpenFollowersList(true)
    }

    const closeFollowersListModal = () => {
        setFollowersList([])
        setIsOpenFollowersList(false)
    }
    return (
        <div>
            <div className="flex space-x-6">
                <div onClick={() => followersRequest(`${appURL}/followers/${user_id}`)}
                    className="cursor-pointer"
                >
                    {strPlural('folower', followers_count)}
                </div>

                <div onClick={() => followersRequest(`${appURL}/following/${user_id}`)}
                    className="cursor-pointer"
                >
                    {following_count} following
                </div>
            </div>

            {isOpenFollowersList && <Modal maxWidth="md" show={isOpenFollowersList} onClose={closeFollowersListModal}>
                <UseInfiniteScroll
                    request={followersRequest}
                    nextPageUrl={nextPageUrl}
                    childrenClassNames="followers_list max-h-96 h-full"
                    ref={scrollRef}
                >
                    <div className="border-b text-center p-3 font-medium" onClick={closeFollowersListModal}>
                        Followers
                    </div>

                    {followersList.map((el) => {
                        return <div className="flex items-center p-4 justify-between">
                            <div className="flex items-center">
                                <Avatar size='sm' user={el.user} divClassName="mr-4" />

                                {el.user.name}
                                {el.user.id}
                            </div>

                            {
                                el.authUserFollowed ? <Unfollow
                                    user={auth.user.id}
                                    follower={el.user.id}
                                    setFollowersList={setFollowersList}
                                />
                                    :
                                    <Follow
                                        user={auth.user && auth.user.id}
                                        following_id={el.user.id}
                                        setFollowersList={setFollowersList}

                                    />
                            }
                        </div>
                    })}
                </UseInfiniteScroll>
            </Modal>}
        </div>
    )
}