import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/inertia-react";

export default function Logout () {

const {
    data,
    post,
    processing,
} = useForm()

const submit = (e) => {
    e.preventDefault()
    post(route('logout'))
}

return <form onSubmit={submit}>
    <PrimaryButton disabled={processing}>
        logout
    </PrimaryButton>
</form>
}