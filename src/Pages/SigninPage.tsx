import { Button, PasswordInput, TextInput } from '@mantine/core'
import { IconHeartbeat } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { signinUser } from '../Service/UserService';
import { errorNotification, successNotification } from '../Utility/NotificationUtil';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setJwt } from '../Slices/JwtSlice';
import { setUser } from '../Slices/UserSlice';


const SigninPage = () => {
    const dispatch= useDispatch();
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value: string) => (!value ? "Password is required" : null)
        },
    });

    const hanldeSubmit = (values: typeof form.values) => {

        signinUser(values).then((_data) => {
            successNotification("Signed In Successfully.");
            dispatch(setJwt(_data));
            dispatch(setUser(jwtDecode(_data)));
            
        }).catch((error) => {
            errorNotification(error?.response?.data?.errorMessage || "Something went wrong");
        })

    };

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center font-heading" style={{ backgroundImage: 'linear-gradient(to right, #e2e2e2, #c9d6ff)' }}>
            <div className="w-[500px] min-h-[200px] bg-white shadow-xl pt-0 rounded-lg ">
                {/* Logo */}
                <div className=' w-full bg-red-300 py-3 text-red-600 flex gap-1 justify-center items-center rounded-tl-lg rounded-tr-lg '>
                    <IconHeartbeat size={45} stroke={2.5} />
                    <span className='font-heading text-3xl font-bold '>Med Care</span>
                    <span className='font-bold text-lg align-super'>+</span>
                </div>
                <div>
                    <form onSubmit={form.onSubmit(hanldeSubmit)} className="flex flex-col gap-5 p-10 pt-5 pb-6 [&_input]:placeholder-gray-500 [&_svg]:text-gray-500" >
                        <div className="self-center font-heading text-2xl font-semibold">Sign In</div>
                        <TextInput  {...form.getInputProps('email')} variant="filled" placeholder="Email" radius="md" size="md" withAsterisk />
                        <PasswordInput  {...form.getInputProps('password')} variant="filled" placeholder="Password" radius="md" size="md" withAsterisk />
                        <Button type="submit" color="red" radius="md" size="md" className="self-center" style={{ width: "180px" }}>Sign In</Button>
                        <div className="self-center">Don't have an account? <Link to="/signup" className='hover:text-[#168b82] hover:underline'> Sign Up</Link></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SigninPage
