import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { appURL } from "@/services";
import UseInfiniteScroll from '@/Components/infinitePaginationHook'
import TextInput from "../TextInput";
import PrimaryButton from "../PrimaryButton";

export default function UsersPage() {
    const [nextPageUrl, setNextPageUrl] = useState('')
    const [users, setUsers] = useState([])
    const [searchInputValue, setSearchInputValue] = useState('')

    const usersRequest = async (url) => {
        const resp = await fetch(url)
        const json = await resp.json()

        setUsers(prevUsers => {
            // Clear previous results if it's a new search or first page of results
            if (!json.prev_page_url) {
                return [...json.data];
            }
            // Append results to the existing list
            return [...prevUsers, ...json.data];
        });        
        
        setNextPageUrl(json.next_page_url)
    }

    useEffect(() => {
        usersRequest(`${appURL}/users/list`)
    }, [])

    const searchFormHundler = (e) => {
        e.preventDefault()

        usersRequest(`${appURL}/users/list/${searchInputValue}`)
    }

    return <>
        <div className="p-4">
            <form className="inlineForm" onSubmit={searchFormHundler}>
                <TextInput name="name" placeholder="Search" className="w-full mr-3" onChange={(e) => setSearchInputValue(e.target.value)} />

                <PrimaryButton>
                    Search
                </PrimaryButton>
            </form>
        </div>

        <div>
            {users.length ? users.map((el) => {
                return <UserCard user={el} authUserFollowed={el.authUserFollowed} setUsersList={setUsers} />
            }) : <div className="text-slate-500 text-center">No results found.</div>}
        </div>
        <UseInfiniteScroll request={usersRequest} nextPageUrl={nextPageUrl} />
    </>
}