import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Head, Link, router, useForm} from '@inertiajs/react';

export default function MyTask({ auth, grabbed_opdlist, grabbed_worklist, msg, msgtype }) {

    const grabTicket = (dd, type) => {
        router.post(route('task_grab', {
            ticket_id: dd.id,
            type: type,
        }));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Tasks</h2>}
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

                <div className="card mb-3">
                    <div className='card-header'><b>PENDING Work Tasks</b></div>
                    <div className="card-body">
                        <div
                            className="table-responsive"
                        >
                            <table
                                className="table table-striped table-bordered"
                            >
                                <thead className='text-center table-light'>
                                    <tr>
                                        <th>Ticket ID</th>
                                        <th>Name</th>
                                        <th>Date Grabbed</th>
                                        <th>Finish Until</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {grabbed_worklist.data.map((d) => (
                                        <tr key={d.id}>
                                            <td className='text-center'>{d.id}</td>
                                            <td>{d.name}</td>
                                            <td className='text-center'>{d.grabbed_date}</td>
                                            <td className='text-center'>{d.until}</td>
                                            <td className='text-center'>

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

                <div className='row'>
                    <div className='col-6'>
                        <div className="card mb-3">
                            <div className='card-header'><b>PENDING OPD to iClinicSys Tasks</b></div>
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
                                            {open_opdlist.data.map((d) => (
                                                <tr className="" key={d.id}>
                                                    <td className='text-center'>
                                                        <div>{d.created_at}</div>
                                                        <div><small>by {d.createdBy.name}</small></div>
                                                    </td>
                                                    <td>{d.name}</td>
                                                    <td className='text-center'>{d.age_sex}</td>
                                                    <td className='text-center'>
                                                        <Link
                                                            href={route('opdtask_view', d.id)}
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
                    <div className='col-6'>
                        <div className="card mb-3">
                            <div className='card-header'><b>PENDING ABTC to iClinicSys Tickets</b></div>
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
            </div>
        </AuthenticatedLayout>
    );
}
