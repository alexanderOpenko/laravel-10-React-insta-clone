import { useState, useRef, createContext } from "react"
import Modal from "@/Components/Modal";
import UseInfiniteScroll from "@/Components/infinitePaginationHook";
import UserCard from "../Users/UserCard";

export const LoadUsersContext = createContext(null)

export default function LoadedUsersList({ 
    children
}) {
    const [usersList, setUsersList] = useState([])
    const [isOpenUsersList, setIsOpenUsersList] = useState(false)
    const [nextPageUrl, setNextPageUrl] = useState('')
    const [heading, setHeading] = useState('')
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
        <LoadUsersContext.Provider value={{ isOpenUsersList, setIsOpenUsersList, usersListRequest, setHeading }}>
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
                        return <UserCard user={el.user} authUserFollowed={el.authUserFollowed} setUsersList={setUsersList}/>
                    })}
                </UseInfiniteScroll>
            </Modal>}
        </LoadUsersContext.Provider>
    )
}