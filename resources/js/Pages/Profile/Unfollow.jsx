import { useForm } from "@inertiajs/react"
import PrimaryButton from '@/Components/PrimaryButton';

export default function Unfollow({ user, follower, setFollowersList = null }) {
    const {
        delete: destroy,
        processing
    } = useForm()

    const submit = (e) => {
        e.preventDefault()
        destroy(route('users.followers.destroy', { user: user, follower: follower }), {
            onSuccess: () => {
                if (setFollowersList) {
                    setFollowersList(prevFollowersList => {
                        prevFollowersList.forEach((el) => {
                            if (el.user.id === follower) {
                                el.authUserFollowed = false
                            }
                        })
                        return prevFollowersList
                    }

                    )
                }
            }
        })
    }

    return <form onSubmit={submit}>
        <PrimaryButton onClick={submit}
            className='bg-slate-400 hover:bg-slate-400'>
            Following
        </PrimaryButton>
    </form>
}