import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Task Generator</h2>}
        >
            <Head title="Task Generator" />

            <div className='container py-12'>
                <div className='text-right mb-3'>
                <Link className='btn btn-success' href={route('taskgenerator.create')}>Create</Link>
                </div>
                <div className="card">
                    <div className="card-body">

                    </div>
                </div>
                
            </div>
        </AuthenticatedLayout>
    );
}
