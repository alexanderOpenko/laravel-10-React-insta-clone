import Avatar from "@/Components/Avatar";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm,usePage } from "@inertiajs/react";
import { useState } from "react";

export default function ProfileAvatar({ user }) {
    const [open, setOpen] = useState(false)

    const openAvatarForm = () => {
        setOpen(true)
    }

    const closeAvatarForm = () => {
        setOpen(false)
    }

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors
    } = useForm({
        avatar: ''
    })

    const avatarSubmit = (e) => {
        e.preventDefault()

        post(route('users.avatar.store', user.id))
    }

    return (
        <div>
            <div onClick={openAvatarForm}>
               <Avatar user={user} size="lg"/>
            </div>

            <Modal show={open} onClose={closeAvatarForm}>
                <form onSubmit={avatarSubmit} className="mt-6 space-y-6">
                    <input
                        type="file"
                        name="avatar"
                        placeholder="avatar"
                        onChange={(e) => setData('avatar', e.target.files[0])}
                    />

                    <InputError message={errors.avatar} className="mt-2"/>

                    <PrimaryButton>
                        Save
                    </PrimaryButton>
                </form>
            </Modal>
        </div>
    )
}