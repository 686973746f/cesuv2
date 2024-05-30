import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Main Menu</h2>}
        >
            <Head title="Main Menu" />

            <div className='container py-12'>
                <div className="card">
                    <div className="card-body">
                        <div className="d-grid gap-2">
                            <Link
                                href={route('task_index')}
                                type="button"
                                name=""
                                id=""
                                className="btn btn-primary"
                            >
                                View Tasks
                            </Link>
                            <Link
                                href={route('taskgenerator.index')}
                                type="button"
                                name=""
                                id=""
                                className="btn btn-primary"
                            >
                                Task Generator
                            </Link>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </AuthenticatedLayout>
    );
}
