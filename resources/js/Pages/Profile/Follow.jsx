import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton"
import Login from "../Auth/Login";
import Modal from "@/Components/Modal";
import { useState } from "react";

export default function Follow({ user, following_id, setFollowersList }) {
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
                if (setFollowersList) {
                    setFollowersList(prevFollowersList => {
                        prevFollowersList.forEach((el) => {
                            if (el.user.id === following_id) {
                                el.authUserFollowed = true
                            }
                        })
                        return prevFollowersList
                    }

                    )
                }
            }
        })
    }

    return (
        <div>
            <form onSubmit={followSubmit}>
                <PrimaryButton className='bg-blue-600'>
                    Follow
                </PrimaryButton>
            </form>

            <Modal show={isOpenLogin} onClose={closeLoginModal}>
                <Login canResetPassword={true} canLogin={true}/>
            </Modal>
        </div>
    )
}