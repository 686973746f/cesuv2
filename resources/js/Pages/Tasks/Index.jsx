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
                <div className="card">
                    <div className='card-header'><b>OPD to iClinicSys Tickets</b></div>
                    <div className="card-body">
                        <div
                            className="table-responsive"
                        >
                            <table
                                className="table table-striped table-bordered"
                            >
                                <thead className='text-center'>
                                    <tr>
                                        <th>Date Encoded</th>
                                        <th>Name</th>
                                        <th>Age/Sex</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {opdlist.data.map((dd) => (
                                        <tr className="" key={dd.id}>
                                            <td className='text-center'>
                                                <div>{dd.created_at}</div>
                                                <div><small>by {dd.createdBy.name}</small></div>
                                            </td>
                                            <td>{dd.name}</td>
                                            <td className='text-center'>{dd.age_sex}</td>
                                            <td className='text-center'>
                                                <form onSubmit={(e) => onSubmit(e, dd.id)}>
                                                    
                                                    <button
                                                        class="btn btn-primary"
                                                    >
                                                        Grab Ticket
                                                    </button>
                                                </form>
                                                
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='text-center'>
                        <Pagination links={opdlist.meta.links} />
                        </div>
                        
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
