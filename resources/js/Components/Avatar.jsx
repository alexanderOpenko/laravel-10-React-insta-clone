import { usePage } from "@inertiajs/react";

export default function Avatar({ divClassName = '', imgClassName = '', size, user }) {
    const { public_url } = usePage().props

    const sizeClass = {
        lg: 'avatar-lg',
        sm: 'avatar-sm'
    }[size]

    return <div className={`cursor-pointer flex ${sizeClass} ${divClassName}`}>
        <img
            className={"object-cover rounded-full" + imgClassName}
            src={public_url + '/' + user.avatar.avatar || public_url + '/' + 'avatar_placeholder.jpg'}
        />
    </div>
}