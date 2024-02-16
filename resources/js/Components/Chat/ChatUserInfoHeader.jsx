import Avatar from "../Avatar";

export default function ChatUserInfoHeader({ receiver }) {
    return (
        <div className="user-info-header bg-white Wpy-3">
            <div className="flex justify-between">
                <div className="flex items-center">
                    <Avatar user={receiver} size="sm"/>

                    <h3 className="text-md pl-4 text-gray-400">
                        {receiver?.name}
                    </h3>
                </div>
            </div>
        </div>
    );
}
