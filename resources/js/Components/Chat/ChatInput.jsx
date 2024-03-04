import { useForm } from "@inertiajs/react";
import TextInput from "../TextInput";
import TransparentButton from "../TransparentButton";
import { memo, useRef } from 'react';
import TextArea from "../TextArea";

export default memo(function ChatInput({ receiver, getLastChat }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        message: "",
    })
    const textAreaRef = useRef(null)

    const onHandleChange = (event) => {
        if (event.target.value === '') {
            textAreaRef.current.style.height = '64px'
        }
    
        if (event.target.value && event.target.value.length % 50 === 0) {
            const currentHeight = textAreaRef.current.clientHeight
            textAreaRef.current.style.height = (currentHeight + 10) + 'px'
        }

        setData(event.target.name, event.target.value)
    }

    const onPasteHandler = () => {
        if (data.message.length > 50) {
            const rowsCount = Math.ceil(data.message.length / 50)
            const increasingHeight = rowsCount * 10

            const currentHeight = textAreaRef.current.clientHeight
            textAreaRef.current.style.height = (currentHeight + increasingHeight) + 'px'
        }
    }

    const submit = (e) => {
        e.preventDefault()

        post(route("chat.store", receiver?.id), {
            onSuccess: () => { 
                getLastChat(receiver?.id)
                textAreaRef.current.style.height = '64px'
            }
        })
        reset("message");
    }

    return (
        <div className="pb-2 md:pb-0 md:px-0 bg-transparent">
            <form onSubmit={submit} className="flex">
                <TextArea
                    ref={textAreaRef}
                    className="h-16 z-[102] w-full overflow-y-auto bg-white pt-3 max-h-[300px]"
                    placeholder="Write a message"
                    name="message"
                    value={data.message}
                    onChange={onHandleChange}
                    style={{resize:"none"}}
                    onPaste={onPasteHandler()}
                />

                <TransparentButton disabled={processing} className="px-[10px]">
                    <i className="fa fa-paper-plane fa-lg" aria-hidden="true"></i>
                </TransparentButton>
            </form>
        </div>
    )
})
