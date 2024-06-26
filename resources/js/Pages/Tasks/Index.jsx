import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Head, Link, router, useForm} from '@inertiajs/react';

export default function Index({ auth, grabbed_opdlist, grabbed_worklist, open_opdlist, open_worklist, msg, msgtype }) {

    const grabTicket = (dd, type) => {
        router.post(route('task_grab', {
            ticket_id: dd.id,
            type: type,
        }));
    }

    const refreshButton = () => {
        router.reload();
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

                <div className='text-right mb-3'>
                <button
                    onClick={refreshButton}
                    className="btn btn-primary"
                >
                    Refresh
                </button>
                
                </div>
                
                <div className="card mb-3">
                    <div className='card-header bg-success text-white'><b>OPEN Work Tasks</b></div>
                    <div className="card-body">
                        <div
                            className="table-responsive"
                        >
                            <table
                                className="table table-striped table-bordered"
                            >
                                <thead className='text-center table-light'>
                                    <tr>
                                        <th>Task</th>
                                        <th>Date Added</th>
                                        <th>Task Name</th>
                                        <th>Valid Until</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {open_worklist.data.map((d) => (
                                        <tr className="" key={d.id}>
                                            <td className='text-center'>{d.id}</td>
                                            <td className='text-center'>{d.created_at}</td>
                                            <td><b>{d.name}</b></td>
                                            <td className='text-center'>{d.until}</td>
                                            <td className='text-center'>
                                            <button
                                                className="btn btn-primary"
                                                onClick={(e) => grabTicket(d, 'work')}
                                            >
                                                Grab Ticket
                                            </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-6'>
                        <div className="card">
                            <div className='card-header bg-success text-white'><b>OPEN OPD to iClinicSys Tickets</b></div>
                            <div className="card-body">
                                <div
                                    className="table-responsive"
                                >
                                    <table
                                        className="table table-striped table-bordered"
                                    >
                                        <thead className='text-center table-light'>
                                            <tr>
                                                <th>Date Encoded</th>
                                                <th>Name</th>
                                                <th>Age/Sex</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {open_opdlist.data.map((dd) => (
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
                                <Pagination links={open_opdlist.meta.links} />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="card">
                            <div className='card-header bg-success text-white'>OPEN Animal Bite to iClinicSys</div>
                            <div className="card-body">

                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </AuthenticatedLayout>
    );
}
