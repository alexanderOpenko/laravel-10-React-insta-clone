import dateString from "@/services";

export default function CreatedAt ({ createdAt }) {
    return <div className="text-sm text-slate-500">
        {dateString(createdAt)}
    </div>
}