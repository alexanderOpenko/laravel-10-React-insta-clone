import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal"
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { router, useForm, useRemember } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function CreatePost(props) {
    const addImageInput = useRef(null)
    const [previewImage, setPreviewImage] = useState('')
    const [formState, setFormState] = useRemember({
        message: null,
    })

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        message: null,
        images: null
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('users.posts.store', props.user.id), {
            onSuccess: () => {
                router.visit('/profile/1')
            }
        })
    }

    const handleImageChange = (e) => {
        const imgage = URL.createObjectURL(e.target.files[0])

        setData('images', e.target.files[0])
        setPreviewImage(imgage)
    }

    const handleAddingPostImage = () => {
        addImageInput.current.click()
    }

    const handleDeletingPostImage = () => {
        setData('images', '')
        setPreviewImage('')
    }

    return (
        <Modal {...props} >
            <form onSubmit={submit} className="p-5">
                <div className="mb-6">
                    <InputLabel htmlFor="message" value="Message" className="sr-only" />

                    <TextArea
                        id="message"
                        type="text"
                        value={data.message || formState.message}
                        name="message"
                        onChange={(e) => {
                            setData('message', e.target.value)
                            setFormState({ 'message': e.target.value })
                        }}
                        className="w-full"
                        placeholder="message"
                    />

                    <InputError message={errors.message} className="mt-2" />
                </div>

                {previewImage &&
                    <div className="mb-6">
                        <img src={previewImage} />
                    </div>
                }

                <div className="mb-6">
                    <InputLabel htmlFor="image-path" value="Message" className="sr-only" />

                    {!previewImage &&
                        <PrimaryButton type='button' onClick={handleAddingPostImage}>
                            Add image
                        </PrimaryButton>
                    }

                    {
                        previewImage &&
                        <PrimaryButton type='button' onClick={handleDeletingPostImage}>
                            Delete image
                        </PrimaryButton>
                    }

                    <TextInput
                        id="image_path"
                        type="file"
                        hidden={true}
                        name="images"
                        onChange={(e) => handleImageChange(e)}
                        placeholder="Image"
                        ref={addImageInput}
                    />

                    {!previewImage &&
                        <InputError message={errors.images} className="mt-2" />
                    }
                </div>

                <div className="flex">
                    <PrimaryButton className="mr-3" disabled={processing}>
                        Create Post
                    </PrimaryButton>

                    <SecondaryButton onClick={props.onClose}>
                        Cancel
                    </SecondaryButton>
                </div>
            </form>
        </Modal>
    )

    //     <x-app-layout>
    //     <form method="POST" enctype="multipart/form-data" action="{{ route('users.posts.store', $user) }}">
    //     @csrf
    //         <div>
    //             <x-input-label for="message" value="Message" />
    //             <x-text-input id="message" type="text" name="message" :value="old('message')" required autofocus autocomplete="postmessage" />
    //          </div>

    //         <div>
    //             <x-input-label for="Images" value="Images" />
    //             <x-text-input id="message" type="text" name="images" required autofocus type="file" multiple />
    //         </div>

    //         <x-primary-button>
    //             Save
    //         </x-primary-button>
    //     </form>
    // </x-app-layout>
}