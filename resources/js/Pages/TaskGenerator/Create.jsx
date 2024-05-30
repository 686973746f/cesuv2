import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SelectInput from '../../Components/SelectInput';
import TextInput from '../../Components/BsTextInput';
import InputLabel from '../../Components/BsInputLabel';
import TextAreaInput from '../../Components/TextAreaInput';

export default function Index({ auth, msg }) {
    const { data, setData, post, errors, reset } = useForm({
        name: "",
        description: "",
        generate_every: "",
        weekly_whatday: "",
        monthly_whatday: "",
        has_duration: "",
        duration_type: "",
        duration_type: "",
        duration_daily_whattime: "",
        duration_weekly_howmanydays: "",
        duration_monthly_howmanymonth: "",
        duration_yearly_howmanyyear: "",
        encodedcount_enable: "",
        has_tosendimageproof: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("taskgenerator.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Task Generator</h2>}
        >
            <Head title="Create Task Generator" />

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
                            <InputLabel value="Task Name"/>
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                onChange={(e) => setData("name", e.target.value)}
                                required
                            />
                            </div>
                            <div className='mb-3'>
                            <InputLabel value="Description"/>
                            <TextAreaInput
                                id="description"
                                name="description"
                                onChange={(e) => setData("description", e.target.value)}
                            />
                            </div>
                            <div className='mb-3'>
                                <InputLabel value="Generate Every"/>
                                <SelectInput
                                id="generate_every"
                                name="generate_every"
                                defaultValue=""
                                onChange={(e) => setData("generate_every", e.target.value)}
                                required
                                >
                                    <option value="" disabled >Choose ...</option>
                                    <option value="DAILY">Daily</option>
                                    <option value="WEEKLY">Weekly</option>
                                    <option value="MONTHLY">Monthly</option>
                                </SelectInput>
                            </div>
                            
                            {data.generate_every === 'WEEKLY' && (
                                <div className='mb-3'>
                                    <InputLabel value="Weekly - On what day"/>
                                    <TextInput
                                        id="weekly_whatday"
                                        type="number"
                                        name="weekly_whatday"
                                        min={1}
                                        max={7}
                                        onChange={(e) => setData("weekly_whatday", e.target.value)}
                                        required
                                    />
                                    <small className='text-muted'>Note: 1 - Monday | 2 - Tuesday | 3 - Wednesday | 4 - Thursday | 5 - Friday | 6 - Saturday | 7 - Sunday</small>
                                </div>
                            )}

                            {data.generate_every === 'MONTHLY' && (
                                <div className='mb-3'>
                                    <InputLabel value="Monthly - On what day"/>
                                    <TextInput
                                        id="monthly_whatday"
                                        type="number"
                                        name="monthly_whatday"
                                        min={1}
                                        max={31}
                                        onChange={(e) => setData("monthly_whatday", e.target.value)}
                                        required
                                    />
                                </div>
                            )}
                            <div className='row'>
                                <div className='col-4'>
                                    <div className='mb-3'>
                                        <InputLabel value="Ticket has duration?"/>
                                        <SelectInput
                                        id="has_duration"
                                        name="has_duration"
                                        defaultValue=""
                                        onChange={(e) => setData("has_duration", e.target.value)}
                                        required
                                        >
                                            <option value="" disabled >Choose ...</option>
                                            <option value="Y">Yes</option>
                                            <option value="N">No</option>
                                        </SelectInput>
                                    </div>

                                    {data.has_duration === 'Y' && (
                                        <div className='mb-3'>
                                            <InputLabel value="Duration Type"/>
                                            <SelectInput
                                            id="duration_type"
                                            name="duration_type"
                                            defaultValue=""
                                            onChange={(e) => setData("duration_type", e.target.value)}
                                            required
                                            >
                                                <option value="" disabled >Choose ...</option>
                                                <option value="DAILY">Daily</option>
                                                <option value="WEEKLY">Weekly</option>
                                                <option value="MONTHLY">Monthly</option>
                                                <option value="YEARLY">Yearly</option>
                                            </SelectInput>
                                        </div>
                                    )}

                                    {data.has_duration === 'Y' && data.duration_type === 'DAILY' && (
                                        <div className='mb-3'>
                                            <InputLabel value="Until what time? (Leave blank to expire the next day)"/>
                                            <TextInput
                                                id="duration_daily_whattime"
                                                type="time"
                                                name="duration_daily_whattime"
                                                onChange={(e) => setData("duration_daily_whattime", e.target.value)}
                                            />
                                        </div>
                                    )}

                                    {data.has_duration === 'Y' && data.duration_type === 'WEEKLY' && (
                                        <div className='mb-3'>
                                            <InputLabel value="Until how many weeks?"/>
                                            <TextInput
                                                id="duration_weekly_howmanydays"
                                                type="number"
                                                name="duration_weekly_howmanydays"
                                                min={1}
                                                onChange={(e) => setData("duration_weekly_howmanydays", e.target.value)}
                                                required
                                            />
                                        </div>
                                    )}

                                    {data.has_duration === 'Y' && data.duration_type === 'MONTHLY' && (
                                        <div className='mb-3'>
                                            <InputLabel value="Until how many month/s?"/>
                                            <TextInput
                                                id="duration_monthly_howmanymonth"
                                                type="number"
                                                name="duration_monthly_howmanymonth"
                                                min={1}
                                                onChange={(e) => setData("duration_monthly_howmanymonth", e.target.value)}
                                                required
                                            />
                                        </div>
                                    )}

                                    {data.has_duration === 'Y' && data.duration_type === 'YEARLY' && (
                                        <div className='mb-3'>
                                            <InputLabel value="Until how many year/s?"/>
                                            <TextInput
                                                id="duration_yearly_howmanyyear"
                                                type="number"
                                                name="duration_yearly_howmanyyear"
                                                min={1}
                                                onChange={(e) => setData("duration_yearly_howmanyyear", e.target.value)}
                                                required
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className='col-4'>
                                    <div className='mb-3'>
                                        <InputLabel value="Enable Encoding Count Input?"/>
                                        <SelectInput
                                        id="encodedcount_enable"
                                        name="encodedcount_enable"
                                        defaultValue=""
                                        onChange={(e) => setData("encodedcount_enable", e.target.value)}
                                        required
                                        >
                                            <option value="" disabled >Choose ...</option>
                                            <option value="Y">Yes</option>
                                            <option value="N">No</option>
                                        </SelectInput>
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <div className='mb-3'>
                                        <InputLabel value="Enable Sending Image/Screenshot as Proof?"/>
                                        <SelectInput
                                        id="has_tosendimageproof"
                                        name="has_tosendimageproof"
                                        defaultValue=""
                                        onChange={(e) => setData("has_tosendimageproof", e.target.value)}
                                        required
                                        >
                                            <option value="" disabled >Choose ...</option>
                                            <option value="Y">Yes</option>
                                            <option value="N">No</option>
                                        </SelectInput>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className='card-footer text-right'>
                            <button
                                className="btn btn-success"
                            >
                                Save
                            </button>
                            
                        </div>
                    </div>
                </form>
                
            </div>
        </AuthenticatedLayout>
    );
}
