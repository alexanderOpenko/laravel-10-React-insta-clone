import { Link } from "@inertiajs/react";
import CreatedAt from "../CreatedAt";
import ExpandingText from "./ExpandingText";

export default function PostMessage({name, message, createdAt, userId}) {
    return <>
        <div className="font-bold whitespace-nowrap text-sm mr-1 cursor-pointer float-left">
            <Link href={route('profile.show', userId)}>
                {name}
            </Link>
        </div>

        <ExpandingText text={message} className="leading-5" />

        <CreatedAt createdAt={createdAt}/>
    </>
}