import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/BsInputLabel';
import TextInput from '@/Components/BsTextInput';
import { Head, Link, useForm} from '@inertiajs/react';

export default function Dashboard({ auth, d, msg, msgtype }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">View OPD Ticket #{d.id}</h2>}
        >
            <Head title="View OPD Ticket" />

            <div className='container py-12'>
                {msg && (
                    <div
                    className={"alert alert-" + msgtype}
                        role="alert"
                    >
                        {msg}
                    </div>
                )}
                <div className="card">
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-3'>
                                <div className='mb-3'>
                                    <InputLabel>Last Name</InputLabel>
                                    <TextInput
                                    value={d.lname}
                                    readOnly
                                    ></TextInput>
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className='mb-3'>
                                    <InputLabel>First Name</InputLabel>
                                    <TextInput
                                    value={d.fname}
                                    readOnly
                                    ></TextInput>
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className='mb-3'>
                                    <InputLabel>Middle Name</InputLabel>
                                    <TextInput
                                    value={d.mname}
                                    readOnly
                                    ></TextInput>
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className='mb-3'>
                                    <InputLabel>Suffix</InputLabel>
                                    <TextInput
                                    value={d.suffix}
                                    readOnly
                                    ></TextInput>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                <div className='mb-3'>
                                    <InputLabel>Birthdate</InputLabel>
                                    <TextInput
                                    type="date"
                                    value={d.bdate}
                                    readOnly
                                    ></TextInput>
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className='mb-3'>
                                    <InputLabel>Sex</InputLabel>
                                    <TextInput
                                    type="text"
                                    value={d.sex}
                                    readOnly
                                    ></TextInput>
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className='mb-3'>
                                    <InputLabel>Civil Status</InputLabel>
                                    <TextInput
                                    type="text"
                                    value={d.cs}
                                    readOnly
                                    ></TextInput>
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className='mb-3'>
                                    <InputLabel>Contact Number</InputLabel>
                                    <TextInput
                                    type="text"
                                    value={d.contact_number}
                                    readOnly
                                    ></TextInput>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-right">
                        <PrimaryButton>Mark as Done</PrimaryButton>
                    </div>
                </div>
                
            </div>
        </AuthenticatedLayout>
    );
}
