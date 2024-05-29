import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ChangeMeLater({ auth}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Test</h2>}
        >
            <Head title="Dashboard" />

            <div className='container py-12'>
                <div class="card">
                    <div class="card-body">
                        
                    </div>
                </div>
                
            </div>
        </AuthenticatedLayout>
    );
}
