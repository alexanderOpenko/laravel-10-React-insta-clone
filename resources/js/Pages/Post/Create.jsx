import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal"
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function CreatePost(props) {
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

        post(route('users.posts.store', props.user.id))
    }

    return (
        <Modal {...props} >
            <form onSubmit={submit}>
                <InputLabel htmlFor="message" value="Message" className="sr-only" />

                <TextInput
                    id="message"
                    type="text"
                    value={data.message}
                    name="message"
                    onChange={(e) => setData('message', e.target.value)}
                    placeholder="message"
                />

                <InputLabel htmlFor="image-path" value="Message" className="sr-only" />

                <TextInput
                    id="image_path"
                    type="file"
                    name="images"
                    onChange={(e) => setData('images', e.target.files[0])}
                    placeholder="Image"
                />
           
                <InputError message={errors.message} className="mt-2" />

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={props.onClose}>
                        Cancel
                    </SecondaryButton>

                    <PrimaryButton className="ms-3" disabled={processing}>
                        Create Post
                    </PrimaryButton>
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