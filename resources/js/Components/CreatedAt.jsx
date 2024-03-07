import dateString, { hoursAndMinutes } from "@/services";

export default function CreatedAt({ createdAt, time = false }) {
    return <div className="text-sm text-slate-500">
        <span className="mr-1">
            {dateString(createdAt)}
        </span>

        <span>
            {time && hoursAndMinutes(createdAt)}
        </span >
    </div >
}