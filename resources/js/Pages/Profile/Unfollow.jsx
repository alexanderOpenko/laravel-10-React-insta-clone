import { useForm } from "@inertiajs/react"
import PrimaryButton from '@/Components/PrimaryButton';
import { handleSuccess } from "@/reloadOnUpdateTrick";

export default function Unfollow ({user, follower}) {
    const {
        delete: destroy,
        processing
    } = useForm()

    const submit = (e) => {
        e.preventDefault()
        destroy(route('users.followers.destroy', { user: user,  follower: follower }), {
            onSuccess: () => {
                handleSuccess(follower)
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