import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Head, Link, router, useForm} from '@inertiajs/react';
import TextInput from '../../Components/BsTextInput';
import InputLabel from '../../Components/BsInputLabel';

export default function ViewTask({ auth, d, msg, msgtype }) {
    const { data, setData, post, errors, reset } = useForm({
        remarks: d.remarks || "",
        encodedcount: d.encodedcount || "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to close this ticket already?")) {
            return;
        }
        
        post(route("worktask_closeticket", d.id));
    };
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">View Task # {d.id}</h2>}
        >
            <Head title="View Task" />
            
            <div className='container py-12'>
                {msg && (
                    <div
                        className={"alert alert-" + msgtype}
                        role="alert"
                    >
                        {msg}
                    </div>
                )}
                
                <form onSubmit={onSubmit}>
                    <div className="card">
                        <div className="card-body">
                            <div className='mb-3'>
                                <label><b>Task Name</b></label>
                                <p>{d.name}</p>
                            </div>
                            <div className='mb-3'>
                                <label><b>Description</b></label>
                                <p>{d.description}</p>
                            </div>
                            <div className='row'>
                                <div className='col-4'>
                                    <div className='mb-3'>
                                        <label><b>Date Created</b></label>
                                        <p>{d.created_at}</p>
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <div className='mb-3'>
                                        <label><b>Status</b></label>
                                        <p>{d.status}</p>
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <div className='mb-3'>
                                        <label><b>Acquired By / Date</b></label>
                                        <p>{d.grabbed_by.name} on {d.grabbed_date}</p>
                                    </div>
                                </div>
                            </div>
                            {d.status === 'CLOSED' || d.status === 'FINISHED' && (
                                <div className='mb-3'>
                                    <label><b>Finished by / Date</b></label>
                                    <p>{d.finished_by.name} on {d.finished_date}</p>
                                </div>
                            )}
                            <hr />
                            {d.encodedcount_enable == 'Y' && (
                                <div className='mb-3 text-left'>
                                    <InputLabel value="Input how many data you encoded (Required)" />
                                    <TextInput
                                    required
                                    id="encodedcount"
                                    name="encodedcount"
                                    type="number"
                                    value={data.encodedcount}
                                    onChange={(e) => setData("encodedcount", e.target.value)}
                                    />
                                </div>
                            )}
                            <div className='mb-3 text-left'>
                                <InputLabel value="Input Remarks (Optional)" />
                                <TextInput
                                id="remarks"
                                name="remarks"
                                type="text"
                                value={data.remarks}
                                onChange={(e) => setData("remarks", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='card-footer text-right'>
                            
                            <button
                                className="btn btn-success"
                                disabled={d.status == 'FINISHED' ? true : false}
                            >
                                Mark as Done
                            </button>
                        </div>
                    </div>
                </form>
                
            </div>
        </AuthenticatedLayout>
    );
}
