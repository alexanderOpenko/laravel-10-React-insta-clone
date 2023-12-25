import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import BaseNav from '@/Components/BaseNav';

export default function Authenticated({ user, auth, header, children }) {
    return (
        <div className="min-h-screen">
            {!auth.user && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div>
                            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                        </div>

                        <div className='flex space-x-4'>
                            <div>
                                <PrimaryButton>
                                    <Link href={route('login')}>
                                        Log In
                                    </Link>
                                </PrimaryButton>
                            </div>

                            <div>
                                <PrimaryButton>
                                    <Link href={route('register')}>
                                        Sign Up
                                    </Link>
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </header>
            )}

            <main>
                <div className={!!auth.user && 'flex'}>
                    {!!auth.user &&
                        <BaseNav />
                    }

                    <div className='w-full'>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
