import { useForm } from "@inertiajs/react"
import PrimaryButton from '@/Components/PrimaryButton';

export default function Unfollow({ user, follower, setUsersList = null, fullWidth = '' }) {
    const {
        delete: destroy,
        processing
    } = useForm()

    const submit = (e) => {
        e.preventDefault()
        destroy(route('users.followers.destroy', { user: user, follower: follower }), {
            onSuccess: () => {
                if (setUsersList) {
                    setUsersList(prevUsersList => {
                        prevUsersList.forEach((el) => {
                            if (el.user.id === follower) {
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

    return <form onSubmit={submit} className={fullWidth}>
        <PrimaryButton onClick={submit}
            className={"bg-slate-400 hover:bg-slate-400 " + fullWidth}>
            Following
        </PrimaryButton>
    </form>
}