import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal"
import PreviewImageOnUploading from "@/Components/PreviewImageOnUploading";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextArea from "@/Components/TextArea";
import { router, useForm, useRemember } from "@inertiajs/react";

export default function CreatePost(props) {
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
                router.visit(`/profile/${props.user.id}`)
            }
        })
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

                <PreviewImageOnUploading 
                    setData={setData} 
                    inputName="images" 
                    errors={errors} 
                />

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
}