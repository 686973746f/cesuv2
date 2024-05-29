import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Head, Link, useForm} from '@inertiajs/react';

export default function Dashboard({ auth, opdlist, msg, msgtype }) {
    const { data, setData, post, errors, reset } = useForm({
        "ticket_id": "",
    });

    const onSubmit = (e, ticket_id) => {
        e.preventDefault();

        setData("ticket_id", ticket_id);

        post(route("opdtask_grab"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tasks Lists</h2>}
        >
            <Head title="Dashboard" />

            <div className='container py-12'>
                {msg && (
                    <div
                        class={"alert alert-" + msgtype}
                        role="alert"
                    >
                        {msg}
                    </div>
                )}
                <div class="card">
                    <div class="card-body">
                        
                    </div>
                    <div class="card-footer text-right">

                    </div>
                </div>
                
            </div>
        </AuthenticatedLayout>
    );
}
