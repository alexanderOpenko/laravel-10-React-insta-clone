import UsersPage from "@/Components/Users/UsersPage";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Users ({ auth }) {
    return <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
        >
            <div className='w-full h-full md:max-w-lg mx-auto'>
                <UsersPage />
            </div>
        </AuthenticatedLayout>
}