import { useForm } from "@inertiajs/react"
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from "../Modal";
import { useState } from "react";

export default function Unfollow({ user, follower, setUsersList = null, fullWidth = '' }) {
    const [isOpenOptions, setIsOpenOptions] = useState(false)

    const {
        delete: destroy,
        processing
    } = useForm()

    const open = () => {
        setIsOpenOptions(true);
    };

    const close = () => {
        setIsOpenOptions(false);
    };

    const submit = (e) => {
        e.preventDefault()
        destroy(route('users.followers.destroy', { user: user, follower: follower }), {
            preserveScroll: true,
            onSuccess: () => {
                if (setUsersList) {
                    setUsersList(prevUsersList => {
                        prevUsersList.forEach((el) => {
                            const userId = el.user ? el.user.id : el.id
                            if (userId === follower) {
                                el.authUserFollowed = false
                            }
                        })
                        return prevUsersList
                    }

                    )
                }
            }
        })
    }

    return <>
        <PrimaryButton onClick={open} className={"hover:bg-slate-400 " + fullWidth} disabled={processing}>
            Following <i className="ml-2 fa fa-angle-down" aria-hidden="true"></i>
        </PrimaryButton>

        <Modal show={isOpenOptions} onClose={close} maxWidth='sm' dialogClasses="!h-auto p-4">
            <div className="font-semibold mb-4 text-center"> 
                Are you sure you want to unfollow ?
            </div>

            <form onSubmit={submit}>
                <PrimaryButton onClick={submit}
                    className={"hover:bg-slate-400 mx-auto !block"}>
                    Unfollow
                </PrimaryButton>
            </form>
        </Modal>
    </>
}