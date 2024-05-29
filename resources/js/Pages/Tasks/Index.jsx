import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, opdlist }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tasks Lists</h2>}
        >
            <Head title="Dashboard" />

            <div className='container py-12'>
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
                                                <div>{dd.createdBy.name}</div>
                                            </td>
                                            <td>{dd.name}</td>
                                            <td className='text-center'>{dd.age_sex}</td>
                                            <td></td>
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
