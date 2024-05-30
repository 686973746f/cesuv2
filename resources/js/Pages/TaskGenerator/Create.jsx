import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SelectInput from '../../Components/SelectInput';

export default function Index({ auth }) {
    const { data, setData, post, errors, reset } = useForm({
        image: "",
        name: "",
        status: "",
        description: "",
        due_date: "",
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
                <form onSubmit={onSubmit}>
                    <div className="card">
                        <div className="card-body">
                        <SelectInput>
                            <option value=""></option>
                        </SelectInput>
                        </div>
                        <div className='card-footer'>

                        </div>
                    </div>
                </form>
                
            </div>
        </AuthenticatedLayout>
    );
}
