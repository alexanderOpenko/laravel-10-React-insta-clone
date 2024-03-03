import Avatar from "../Avatar";

export default function ChatUserInfoHeader({ receiver }) {
    return (
        <div className="user-info-header Wpy-3">
            <div className="flex justify-between">
                <div className="flex items-center">
                    <Avatar user={receiver} size="2sm"/>

                    <h3 className="text-lg font-medium pl-4 text-zinc-500">
                        {receiver?.name}
                    </h3>
                </div>
            </div>
        </div>
    );
}
