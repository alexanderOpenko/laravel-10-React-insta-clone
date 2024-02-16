import FollowersInterface from "@/Pages/Profile/FollowersInterface";
import LoadedUsersList from "@/Pages/Profile/LoadedUsersList";
import { strPlural } from "@/services";
import classNames from "classnames";

export default function CounterPanel ({ totalPosts, user, styleClass = '', isMobile = false}) {
    const itemClasses = classNames({
        "flex flex-col items-center": isMobile,
        "cursor-pointer": true
    })

    return <div className={`flex space-x-6 w-full font-semibold text-lg ${styleClass}`}>
    <div className={itemClasses}>
        <span>
            { `${totalPosts} ` }
        </span>

        <span className="font-normal">
            {strPlural('post', totalPosts).split(' ')[1]}
        </span>
    </div>

    <LoadedUsersList 
        heading="Followers"
    >
        <FollowersInterface user={user} isMobile={isMobile}/>
    </LoadedUsersList>
</div>
}