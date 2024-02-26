import { useForm } from "@inertiajs/react";
import TextInput from "../TextInput";
import TransparentButton from "../TransparentButton";
import { memo } from 'react';

export default memo(function ChatInput({ receiver, getLastChat }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        message: "",
    })

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route("chat.store", receiver?.id), {
            onSuccess: () => getLastChat(receiver?.id)
        })
        reset("message");
    }

    return (
        <div className="py-2 px-[10px] md:px-0 bg-transparent">
            <form onSubmit={submit} className="flex">
                <TextInput
                    className="h-16 w-full overflow-y-auto bg-white pt-3 mr-3"
                    placeholder="Write a message"
                    name="message"
                    value={data.message}
                    onChange={onHandleChange}
                />

                <TransparentButton disabled={processing}>
                    <i className="fa fa-paper-plane fa-lg" aria-hidden="true"></i>
                </TransparentButton>
            </form>
        </div>
    )
})
