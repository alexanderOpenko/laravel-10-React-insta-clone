import Avatar from "@/Components/Avatar";
import Modal from "@/Components/Modal";
import PreviewImageOnUploading from "@/Components/PreviewImageOnUploading";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function ProfileAvatar({ user, auth }) {
    const [open, setOpen] = useState(false)

    const openAvatarForm = () => {
        if (auth.user?.id === user.id) {
            setOpen(true)
        }
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
        avatar: null
    })

    const {
        delete: destroy
    } = useForm()

    const avatarSubmit = (e) => {
        e.preventDefault()

        post(route('users.avatar.store', user.id), {
            onSuccess: () => {
                closeAvatarForm()
            }
        })
    }

    const deleteSubmit = (e) => {
        e.preventDefault()

        destroy(route('users.avatar.destroy', { 'user': user, 'avatar': user.avatar }), {
            onSuccess: () => {
                closeAvatarForm()
            }
        })
    }

    return (
        <div className='user-avatar mr-5 md:mr-10 flex items-center'>
            <div onClick={openAvatarForm}>
                <Avatar divClassName={auth.user?.id !== user.id ? "!cursor-auto" : ""} user={user} size="lg" isLinkable={false}/>
            </div>

            <Modal show={open} onClose={closeAvatarForm}>
                <div className="p-5">
                    {
                        user.avatar && <div className="mb-6">
                            <form onSubmit={deleteSubmit}>
                                <PrimaryButton>
                                    Delete profile image
                                </PrimaryButton>
                            </form>
                        </div>
                    }

                    <form onSubmit={avatarSubmit} className="space-y-6">
                        <PreviewImageOnUploading
                            setData={setData}
                            inputName="avatar"
                            errors={errors}
                            buttonLabel={user.avatar ? 'Change image' : 'Add image'}
                        />

                        <div className="flex">
                            <PrimaryButton disabled={processing} className="!mr-3">
                                Save
                            </PrimaryButton>

                            <SecondaryButton onClick={closeAvatarForm}>
                                Cancel
                            </SecondaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}