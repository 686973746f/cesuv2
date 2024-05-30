import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, task_list, msg }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Task Generator</h2>}
        >
            <Head title="Task Generator" />

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
                    <Link className='btn btn-success' href={route('taskgenerator.create')}>Create</Link>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div
                            className="table-responsive"
                        >
                            <table
                                className="table table-striped table-bordered"
                            >
                                <thead className='text-center'>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Task Name</th>
                                        <th scope="col">Generate on</th>
                                        <th scope="col">Date Created</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {task_list.data.map((d) => (
                                        <tr className="" key={d.id}>
                                            <td>{d.id}</td>
                                            <td>{d.name}</td>
                                            <td>{d.generate_every}</td>
                                            <td>{d.created_at}</td>
                                        </tr>
                                    ))}
                                    
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </AuthenticatedLayout>
    );
}
