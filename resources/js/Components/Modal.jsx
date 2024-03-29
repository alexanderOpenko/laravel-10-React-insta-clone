import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function Modal({ children, show = false, maxWidth = '2xl', dialogClasses = '', closeable = true, onClose = () => { } }) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl'
    }[maxWidth];

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed DIALOG inset-0 flex overflow-y-auto px-5 py-8 items-center z-50 transform transition-all"
                onClose={close}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-500/75" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel
                        className={`h-full items-center bg-white shadow-xl
                         transform transition-all w-full sm:mx-auto rounded-lg ${maxWidthClass} ${dialogClasses}`}
                    >
                        {children}
                    </Dialog.Panel>
                </Transition.Child>

                <div className="absolute text-3xl text-white top-[9px] right-[18px] z-[10]" onClick={close}>
                    <i className="fa fa-times cursor-pointer" aria-hidden="true"></i>
                </div>
            </Dialog>
        </Transition>
    );
}
