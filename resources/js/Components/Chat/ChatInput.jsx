import { useForm } from "@inertiajs/react";
import TextInput from "../TextInput";
import TransparentButton from "../TransparentButton";

export default function ChatInput({ receiver, getLastChat }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        message: "",
    })

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route("chat.store", receiver?.id), {
            onSuccess: () => getLastChat()
        })
        reset("message");
    }

    return (
        <div className="bg-white p-4 absolute right-0 bottom-0 left-0">
            <form onSubmit={submit} className="flex">
                <TextInput
                    className="h-16 w-full overflow-y-auto bg-white pt-3 font-light mr-3"
                    placeholder="Write a message"
                    name="message"
                    value={data.message}
                    onChange={onHandleChange}
                />

                <TransparentButton>
                    <i class="fa fa-paper-plane fa-lg" aria-hidden="true"></i>
                </TransparentButton>
            </form>
        </div>
    )
}
