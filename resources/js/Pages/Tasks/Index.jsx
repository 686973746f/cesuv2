import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Head, Link, router, useForm} from '@inertiajs/react';

export default function Dashboard({ auth, opdlist, existing_tickets, msg, msgtype }) {

    const grabTicket = (dd, type) => {
        router.post(route('task_grab', {
            ticket_id: dd.id,
            type: type,
        }));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tasks Lists</h2>}
        >
            <Head title="Task Lists" />

            <div className='container py-12'>
                {msg && (
                    <div
                        className={"alert alert-" + msgtype}
                        role="alert"
                    >
                        {msg}
                    </div>
                )}

                <div className='row'>
                    <div className='col-6'>
                        <div className="card mb-3">
                            <div className='card-header'><b>Your Pending CESU Tasks</b></div>
                            <div className="card-body">

                            </div>
                            <div className='card-footer text-right'>
                                <Link className='btn btn-link'>View More</Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="card mb-3">
                            <div className='card-header'><b>Your Pending OPD to iClinicSys Tasks</b></div>
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
                                            {existing_tickets.data.map((dd) => (
                                                <tr className="" key={dd.id}>
                                                    <td className='text-center'>
                                                        <div>{dd.created_at}</div>
                                                        <div><small>by {dd.createdBy.name}</small></div>
                                                    </td>
                                                    <td>{dd.name}</td>
                                                    <td className='text-center'>{dd.age_sex}</td>
                                                    <td className='text-center'>
                                                        <Link
                                                            href={route('opdtask_view', dd.id)}
                                                            className="btn btn-primary"
                                                        >
                                                            View
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='card-footer text-right'>
                                <Link className='btn btn-link'>View More</Link>
                            </div>
                        </div>
                    </div>
                </div>
                

                <div className="card mb-3">
                    <div className='card-header bg-success text-white'><b>CESU Tasks</b></div>
                    <div className="card-body">

                    </div>
                </div>

                <div className="card">
                    <div className='card-header bg-success text-white'><b>OPD to iClinicSys Tickets</b></div>
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
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={(e) => grabTicket(dd, 'opd')}
                                                >
                                                    Grab Ticket
                                                </button>
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
