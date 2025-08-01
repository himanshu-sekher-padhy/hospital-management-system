import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates';
import { IconDownload, IconEdit } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import { useSelector } from 'react-redux';
import { doctorDepartments, specializations } from '../../../Data/Dropdowndata';
import { useDisclosure } from '@mantine/hooks';
import { getDoctor, updateDoctor } from '../../../Service/DoctorProfileService';
import { useForm } from '@mantine/form';
import { formatDate } from '../../../Utility/DateUtility';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';

const doctor: any = {
    name: "Lipsita Badtiya",
    email: "lipsita2004@gmail.com",
    dob: "23-03-2004",
    phone: "+91 78469 40190",
    address: "Fakirmohan Marg, Nalco Township, Damanjodi, Koraput, Odisha",
    licenseNo: "4042-0489-6968",
    specialization: "Cardiology",
    department: "Cardiology",
    experience: "10",
};
const Profile = () => {
    const user = useSelector((state: any) => state.user);
    const [opened, { open, close }] = useDisclosure(false);
    const [editMode, setEdit] = useState(false);
    const [profile, setProfile] = useState<any>({});
    useEffect(() => {
        getDoctor(user.profileId).then((data) => {
            setProfile({ ...data});
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    const form = useForm({
        initialValues: {
            dob: '',
            phone: '',
            address: '',
            LicenseNo: '',
            specialization: '',
            department: '',
            experience: '',
        },
        validate: {
            dob: (value: String) => !value ? 'Date of Birth is required' : undefined,
            phone: (value: String) => !value ? 'Phone number is required' : undefined,
            address: (value: String) => !value ? 'Address is required' : undefined,
            LicenseNo: (value: String) => !value ? 'License number is required' : undefined,
            specialization: (value: String) => !value ? 'Specialization is required' : undefined,
            department: (value: String) => !value ? 'Department is required' : undefined,
        },
    });
    const handleEdit = () => {
        form.setValues({ ...profile, dob: profile.dob ? new Date(profile.dob) : undefined });
        setEdit(true);
    }
    const handleSubmit = (e: any) => {
        let values = form.getValues();
        form.validate();
        if (!form.isValid()) return;
        updateDoctor({ ...profile, ...values }).then((_data) => {
            successNotification("Profile Updated Successfully");
            setProfile({ ...profile, ...values });
            setEdit(false);
        }).catch((error) => {
            console.log(error);
            errorNotification(error.response.data.errorMessage);
        })
    }
    return (
        <div className="p-10">
            <div className="flex justify-between items-center">
                <div className="flex gap-5 items-center">
                    <div className="flex flex-col items-center gap-3">
                        <Avatar variant='filled' src='/avatar.jpg' size='150' alt='' />
                        {editMode && <Button variant='filled' size="md" onClick={open} >Upload</Button>}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className="text-3xl font-medium text-neutral-900">{user.name}</div>
                        <div className="text-lg text-neutral-700">{user.email}</div>
                    </div>
                </div>
                {!editMode ? <Button variant='filled' size="md" type="button" onClick={handleEdit} leftSection={<IconEdit />}>Edit</Button> : <Button variant='filled' size="md" onClick={handleSubmit} type="submit" leftSection={<IconDownload />}>Save</Button>}
            </div>
            <Divider my="xl" />
            <div className='flex flex-col gap-5'>
                <div className="text-2xl font-medium text-neutra-900">doctor Information</div>
                <Table striped verticalSpacing="sm" className=" bg-white border border-gray-200 rounded-lg shadow-[0_0_12px_rgba(0,0,0,0.13)] ">
                    <Table.Tbody>
                        <Table.Tr className="border-b border-gray-200 hover:bg-cyan-100 transition duration-150">
                            <Table.Th className="text-left p-3 font-semibold  text-neutral-900 w-1/3">
                                Date of Birth
                            </Table.Th>
                            {editMode ? <Table.Td className='text-xl'><DateInput {...form.getInputProps("dob")} placeholder="Date of Birth" /></Table.Td> : <Table.Td className="p-3 ">{formatDate(profile.dob) ?? '-'} </Table.Td>}
                        </Table.Tr>
                        <Table.Tr className="border-b border-gray-200 hover:bg-cyan-100 transition duration-150">
                            <Table.Th className="text-left p-3 font-semibold  text-neutral-900">
                                Phone
                            </Table.Th>
                            {editMode ? <Table.Td className='text-xl'><PhoneInput {...form.getInputProps("phone")} country={'in'} /></Table.Td> : <Table.Td className="p-3 ">{profile.phone ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr className="border-b border-gray-200 hover:bg-cyan-100 transition duration-150">
                            <Table.Th className="text-left p-3 font-semibold  text-neutral-900">
                                Address
                            </Table.Th>
                            {editMode ? <Table.Td className='text-xl'><TextInput {...form.getInputProps("address")} placeholder='Address' /></Table.Td> : <Table.Td className="p-3 ">{profile.address ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr className="border-b border-gray-200 hover:bg-cyan-100 transition duration-150">
                            <Table.Th className="text-left p-3 font-semibold  text-neutral-900">
                                License Number
                            </Table.Th>
                            {editMode ? <Table.Td className='text-xl'><TextInput {...form.getInputProps("licenseNo")} placeholder='License Number' /></Table.Td> : <Table.Td className="p-3 ">{profile.licenseNo ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr className="border-b border-gray-200 hover:bg-cyan-100 transition duration-150">
                            <Table.Th className="text-left p-3 font-semibold  text-neutral-900">
                                Specialization
                            </Table.Th>
                            {editMode ? <Table.Td className='text-xl'><Select {...form.getInputProps("specialization")} placeholder="Specialization" data={specializations} /></Table.Td> : <Table.Td className="p-3  ">{profile.specialization ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr className="border-b border-gray-200 hover:bg-cyan-100 transition duration-150">
                            <Table.Th className="text-left p-3 font-semibold  text-neutral-900">
                                Department
                            </Table.Th>
                            {editMode ? <Table.Td className='text-xl'><Select {...form.getInputProps("department")} placeholder="Department" data={doctorDepartments} /></Table.Td> : <Table.Td className="p-3 ">{profile.department ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr className='hover:bg-cyan-100 transition duration-150'>
                            <Table.Th className="text-left p-3 font-semibold  text-neutral-900">
                                Experience
                            </Table.Th>
                            {editMode ? <Table.Td className='text-xl'><NumberInput  {...form.getInputProps("experience")} maxLength={2} max={50} clampBehavior='strict' placeholder='Experience(in Years)' hideControls /></Table.Td> : <Table.Td className="p-3 ">{profile.experience ?? '-'} {profile.experience ? 'years' : ''}</Table.Td>}
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </div>
            <Modal centered opened={opened} onClose={close} title={<span className='text-xl font-medium'>Upload Profile Picture</span>}>
                {/* Modal content */}
            </Modal>
        </div>
    )
}
export default Profile
