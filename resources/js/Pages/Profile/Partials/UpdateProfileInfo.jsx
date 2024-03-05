import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInfo ({ className = ''}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        birthday: '',
        biography: '',
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile-info.update', { user: user.id }));
    };

    return (
        <section className={className}>
            <header>
                <p>
                    Update your date of birth and biography
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="birthday" value="Birthday" />

                    <TextInput
                        id="birthday"
                        className="mt-1 block w-full"
                        value={data.birthday}
                        onChange={(e) => setData('birthday', e.target.value)}
                        isFocused
                        autoComplete="birthday"
                        type="date"
                    />

                    <InputError className="mt-2" message={errors.birthday} />
                </div>

                <div>
                    <InputLabel htmlFor="biography" value="Biography" />

                    <TextArea
                        id="biography"
                        className="mt-1 block w-full"
                        value={data.biography}
                        onChange={(e) => setData('biography', e.target.value)}
                        isFocused
                        autoComplete="birthday"
                        type="text"
                    />

                    <InputError className="mt-2" message={errors.biography} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
       </section>
    )
}