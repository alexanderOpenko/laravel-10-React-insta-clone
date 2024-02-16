import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton"
import Login from "../Auth/Login";
import Modal from "@/Components/Modal";
import { useState } from "react";

export default function Follow({ user, following_id, setUsersList, fullWidth = '' }) {
    const [isOpenLogin, setIsOpenLogin] = useState(false)
    const {
        post,
        processing
    } = useForm()

    const openLoginModal = () => {
        setIsOpenLogin(true)
    }

    const closeLoginModal = () => {
        setIsOpenLogin(false)
    }

    const followSubmit = (e) => {
        e.preventDefault()

        if (!user) {
            openLoginModal()
            return
        }

        post(route('users.followers.store', { user: user, following_id: following_id }), {
            onSuccess: () => {
                if (setUsersList) {
                    setUsersList(prevUsersList => {
                        prevUsersList.forEach((el) => {
                            if (el.user.id === following_id) {
                                el.authUserFollowed = true
                            }
                        })
                        return prevUsersList
                    }

                    )
                }
            }
        })
    }

    return (
        <>
            <form onSubmit={followSubmit} className={fullWidth}>
                <PrimaryButton className={"bg-blue-600 " + fullWidth}>
                    Follow
                </PrimaryButton>
            </form>

            <Modal show={isOpenLogin} onClose={closeLoginModal}>
                <Login canResetPassword={true} canLogin={true}/>
            </Modal>
        </>
    )
}