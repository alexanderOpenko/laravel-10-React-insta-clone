import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import BaseNav from '@/Components/BaseNav';
import classNames from 'classnames';
import { createContext } from 'react';

export const AuthContext = createContext(null);

export default function Authenticated({ user, auth, header, children, zIndex = '' }) {
    const layoutClasses = classNames({
        "h-full": true,
        "flex": !!auth.user
    })

    return (
        <AuthContext.Provider value={auth}>
        <div className="h-full">
            {!auth.user && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div>
                            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                        </div>

                        <div className='flex space-x-4'>
                            <div>
                                <PrimaryButton className='!p-0'>
                                    <Link href={route('login')} className='px-4 py-2'> 
                                        Log In
                                    </Link>
                                </PrimaryButton>
                            </div>

                            <div>
                                <PrimaryButton className='!p-0'>
                                    <Link href={route('register')} className='px-4 py-2'>
                                        Sign Up
                                    </Link>
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </header>
            )}

            <main className='h-full'>
                <div className={layoutClasses}>
                    {!!auth.user &&
                        <BaseNav />
                    }

                    <div className={"w-full " + zIndex}>
                        {children}
                    </div>
                </div>
            </main>
        </div>
        </AuthContext.Provider >
    );
}
