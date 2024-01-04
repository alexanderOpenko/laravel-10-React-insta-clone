import { router, useForm } from "@inertiajs/react";
import TextInput from "../TextInput";
import InputError from "../InputError";

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
        <div className="w-full bg-white pl-4">
            <form onSubmit={submit}>
                <TextInput
                    className="h-16 w-full overflow-y-auto bg-white pt-3 font-light border-0 hover:border-0 focus:border-0 focus:ring-0 !shadow-none focus:!outline-none"
                    placeholder="Write a message"
                    name="message"
                    value={data.message}
                    onChange={onHandleChange}
                ></TextInput>

            </form>
        </div>
    )
}
