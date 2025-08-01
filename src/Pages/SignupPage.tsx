import { Button, PasswordInput, SegmentedControl, TextInput } from '@mantine/core'
import React from 'react'
import { IconHeartbeat } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../Service/UserService';
import { errorNotification, successNotification } from '../Utility/NotificationUtil';

const SignupPage = () => {
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            name: '',
            role: 'PATIENT',
            email: '',
            password: '',
            confirmPassword: '',
        },

        validate: {
            name: (value: string) => (!value ? "Name is required" : null),
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value: string) =>
                !value
                    ? "Password is required"
                    : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
                        ? "Password must be atleast 8 characters, include uppercase, lowercase, number, and special character"
                        : null,
            confirmPassword: (value: string, values: { password: string }) =>
                (value === values.password ? null : "Password didn't match")
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        signupUser(values).then((data) => {
            successNotification("Signed Up Successfully.");
            navigate('/signin');
        }).catch((error) => {
            console.log(error);
            errorNotification(error.response.data.errorMessage);
        })
    };

    return (
        <div className=" h-screen w-screen flex flex-col items-center justify-center font-heading" style={{ backgroundImage: 'linear-gradient(to right, #e2e2e2, #c9d6ff)' }}>
            <div className="w-[500px] min-h-[200px] bg-white shadow-xl pt-0 rounded-lg ">
                {/* Logo */}
                <div className=' w-full bg-red-300 py-3 text-red-600 flex gap-1 justify-center items-center rounded-tl-lg rounded-tr-lg '>
                    <IconHeartbeat size={45} stroke={2.5} />
                    <span className='font-heading text-3xl font-bold '>Med Care</span>
                    <span className='font-bold text-lg align-super'>+</span>
                </div>
                <div>
                    <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-5 p-10 pt-5 pb-6 [&_input]:placeholder-gray-500 [&_svg]:text-gray-500" >
                        <div className="self-center font-heading text-2xl font-semibold">Sign Up</div>
                        <SegmentedControl {...form.getInputProps("role")} fullWidth size="md" radius="md" color="red"
                            data={[
                                { label: 'ADMIN', value: 'ADMIN' },
                                { label: 'DOCTOR', value: 'DOCTOR' },
                                { label: 'PATIENT', value: 'PATIENT' },
                            ]} />
                        <TextInput  {...form.getInputProps('name')} variant="filled" placeholder="Name" radius="md" size="md" withAsterisk />
                        <TextInput  {...form.getInputProps('email')} variant="filled" placeholder="Email" radius="md" size="md" withAsterisk />
                        <PasswordInput  {...form.getInputProps('password')} variant="filled" placeholder="Password" radius="md" size="md" withAsterisk />
                        <PasswordInput  {...form.getInputProps('confirmPassword')} variant="filled" placeholder="Confirm Password" radius="md" size="md" withAsterisk />
                        <Button type="submit" color="red" radius="md" size="md" className="self-center" style={{ width: "180px" }}>Sign Up</Button>
                        <div className="self-center">Already have an account? <Link to="/signin" className='hover:text-[#168b82] hover:underline'> Sign In</Link></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
