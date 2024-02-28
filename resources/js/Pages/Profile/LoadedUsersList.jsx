import { useContext, useState, useRef, createContext } from "react"
import Modal from "@/Components/Modal";
import Avatar from "@/Components/Avatar";
import Unfollow from "./Unfollow";
import Follow from "./Follow";
import UseInfiniteScroll from "@/infinitePaginationHook";
import { AuthContext } from "@/Layouts/AuthenticatedLayout";

export const LoadUsersContext = createContext(null)

export default function LoadedUsersList({ 
    heading,
    children
}) {
    const auth = useContext(AuthContext)
    const [usersList, setUsersList] = useState([])
    const [isOpenUsersList, setIsOpenUsersList] = useState(false)
    const [nextPageUrl, setNextPageUrl] = useState('')

    const scrollRef = useRef(null)

    async function usersListRequest(url) {
        const resp = await fetch(url)
        const json = await resp.json()

        setUsersList([...usersList, ...json.data])
        setNextPageUrl(json.next_page_url)
    }

    const closeUsersListModal = () => {
        setUsersList([])
        setIsOpenUsersList(false)
    }
    return (
        <LoadUsersContext.Provider value={{ isOpenUsersList, setIsOpenUsersList, usersListRequest }}>
            {children}
            {isOpenUsersList && <Modal maxWidth="md" show={isOpenUsersList} onClose={closeUsersListModal} dialogClasses="max-h-[430px]">
                <UseInfiniteScroll
                    request={usersListRequest}
                    nextPageUrl={nextPageUrl}
                    childrenClassNames="users_list h-full"
                    ref={scrollRef}
                >
                    <div className="border-b text-center p-3 font-medium" onClick={closeUsersListModal}>
                        { heading }
                    </div>

                    {usersList.map((el) => {
                        return <div className="flex items-center py-3 px-4 justify-between">
                            <div className="flex items-center">
                                <Avatar size='sm' user={el.user} divClassName="mr-4" />

                                {el.user.name}
                            </div>

                            {auth.user.id !== el.user.id && <>{
                                el.authUserFollowed ? <Unfollow
                                    user={auth.user.id}
                                    follower={el.user.id}
                                    setUsersList={setUsersList}
                                />
                                    :
                                    <Follow
                                        user={auth.user?.id}
                                        following_id={el.user.id}
                                        setUsersList={setUsersList}

                                    />
                                }</>
                            }
                        </div>
                    })}
                </UseInfiniteScroll>
            </Modal>}
        </LoadUsersContext.Provider>
    )
}