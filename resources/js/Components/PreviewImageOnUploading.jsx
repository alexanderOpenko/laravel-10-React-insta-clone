import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "./InputLabel";
import InputError from "./InputError";
import { useRef, useState } from "react";

export default function PreviewImageOnUploading ({ setData, inputName, errors, buttonLabel = "Add image" }) {
    const addImageInput = useRef(null)

    const [previewImage, setPreviewImage] = useState('')

    const handleImageChange = (e) => {
        const imgage = URL.createObjectURL(e.target.files[0])

        setData(inputName, e.target.files[0])
        setPreviewImage(imgage)
    }

    const handleAddingPostImage = () => {
        addImageInput.current.click()
    }

    const handleDeletingPostImage = () => {
        addImageInput.current.value = null
        setData(inputName, '')
        setPreviewImage('')
    }

    return (
        <>
            {
                previewImage &&
                <div className="mb-6 flex justify-center">
                    <img src={previewImage} className="max-w-1/2 w-full object-contain"/>
                </div>
            }

            <div className="mb-6">
                <InputLabel htmlFor="image-path" value="Message" className="sr-only" />

                {
                    !previewImage &&
                    <PrimaryButton type='button' onClick={handleAddingPostImage}>
                        {buttonLabel}
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
                    name={inputName}
                    onChange={(e) => handleImageChange(e)}
                    placeholder="Image"
                    ref={addImageInput}
                />

                
                <InputError message={errors[inputName]} className="mt-2" />
                
            </div>
        </>
    )
}