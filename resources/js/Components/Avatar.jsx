import { usePage } from "@inertiajs/react";

export default function Avatar({ divClassName = '', imgClassName = '', size, user }) {
    const { public_url } = usePage().props

    const sizeClass = {
        lg: 'w-[77px] h-[77px] lg:w-[150px] lg:h-[150px]',
        sm: 'w-[50px] h-[50px]',
        xsm: 'w-[25px] h-[25px]'
    }[size]

    const imgSrc = user.avatar ? public_url + '/' + user.avatar.avatar 
    : public_url + '/' + 'avatar_placeholder.jpg'

    return <div className={`cursor-pointer flex ${sizeClass} ${divClassName}`}>
        <img
            className={"object-cover rounded-full" + imgClassName}
            src={imgSrc}
        />
    </div>
}