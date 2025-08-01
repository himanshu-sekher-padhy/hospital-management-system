import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates';
import { IconDownload, IconEdit } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import { useSelector } from 'react-redux';
import { bloodGroup, bloodGroups } from '../../../Data/Dropdowndata';
import { useDisclosure } from '@mantine/hooks';
import { getPatient, updatePatient } from '../../../Service/PatientProfileService';
import { formatDate } from '../../../Utility/DateUtility';
import { useForm } from '@mantine/form';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { arrayToCSV } from '../../../Utility/OtherUtility';

const Patient: any = {
    name: "Lipsita Badtiya",
    email: "lipsita2004@gmail.com",
    dob: "2004-03-23",
    phone: "+91 78469 40190",
    address: "Fakirmohan Marg, Nalco Township, Damanjodi, Koraput, Odisha",
    aadharNo: "4042-0489-6968",
    bloodGroup: "O+",
    allergies: "Himanshu",
    chronicDisease: "Diabetes",
};

const Profile = () => {
    const user = useSelector((state: any) => state.user);
    const [opened, { open, close }] = useDisclosure(false);
    const [editMode, setEdit] = useState(false);
    const [profile, setProfile] = useState<any>({});
    useEffect(() => {
        getPatient(user.profileId).then((data) => {
            setProfile({...data, allergies: data.allergies? (JSON.parse(data.allergies)): null, chronicDisease: data.chronicDisease? (JSON.parse(data.chronicDisease)): null});
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    const form = useForm({
        initialValues: {
            dob: '',
            phone: '',
            address: '',
            aadharNo: '',
            bloodGroup: '',
            allergies: [],
            chronicDisease: [],
        },
        validate: {
           dob: (value: String) => !value ? 'Date of Birth is required' : undefined,
           phone: (value: String) => !value ? 'Phone number is required' : undefined,
           address: (value: String) => !value ? 'Address is required' : undefined,
           aadharNo: (value: String) => !value ? 'Aadhar number is required' : undefined,
        },
    });
    const handleEdit=()=>{
        form.setValues({...profile, dob: profile.dob ? new Date(profile.dob) : undefined, chronicDisease: profile.chronicDisease ?? [], allergies: profile.allergies ?? [] });
        setEdit(true);
    }
    const handleSubmit=(e: any)=>{
        let values= form.getValues();
        form.validate();
        if(!form.isValid()) return;
        updatePatient({...profile, ...values, allergies: values.allergies? JSON.stringify(values.allergies): null, chronicDisease: values.chronicDisease? JSON.stringify(values.chronicDisease): null}).then((data)=>{
            successNotification("Patient Profile Updated Successfully");
            setProfile({...profile, ...values});
            setEdit(false);
        }).catch((error)=> {
            console.log(error);
            errorNotification(error.response.data.errorMessage);
        })
    }
    return (
        <div className="p-10" >
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
                {!editMode ? <Button variant='filled' size="md" type="button" onClick={handleEdit} leftSection={<IconEdit />}>Edit</Button> : <Button variant='filled' size="md" onClick= {handleSubmit} type="submit" leftSection={<IconDownload />}>Save</Button>}
            </div>
            <Divider my="xl" />
            <div className='flex flex-col gap-5'>
                <div className="text-2xl font-medium text-neutra-900">Patient Information</div>
                <Table verticalSpacing="sm" className=" bg-white border border-gray-200 rounded-lg shadow-[0_0_12px_rgba(0,0,0,0.13)] ">
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
                                Aadhar Number
                            </Table.Th>
                            {editMode ? <Table.Td className='text-xl'><NumberInput {...form.getInputProps("aadharNo")} maxLength={12} clampBehavior='strict' placeholder='Aadhar Number' hideControls /></Table.Td> : <Table.Td className="p-3 ">{profile.aadharNo ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr className="border-b border-gray-200 hover:bg-cyan-100 transition duration-150">
                            <Table.Th className="text-left p-3 font-semibold  text-neutral-900">
                                Blood Group
                            </Table.Th>
                            {editMode ? <Table.Td className='text-xl'><Select {...form.getInputProps("bloodGroup")} placeholder="Blood Group" data={bloodGroups} /></Table.Td> : <Table.Td className="p-3">{bloodGroup[profile.bloodGroup] ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr className="border-b border-gray-200 hover:bg-cyan-100 transition duration-150">
                            <Table.Th className="text-left p-3 font-semibold  text-neutral-900">
                                Allergies
                            </Table.Th>
                            {editMode ? <Table.Td className='text-xl'><TagsInput {...form.getInputProps("allergies")} placeholder="Allergies separated by comma" /></Table.Td> : <Table.Td className="p-3 ">{arrayToCSV(profile.allergies) ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr className='hover:bg-cyan-100 transition duration-150'>
                            <Table.Th className="text-left p-3 font-semibold  text-neutral-900">
                                Chronic Disease
                            </Table.Th>
                            {editMode ? <Table.Td className='text-xl'><TagsInput {...form.getInputProps("chronicDisease")} placeholder="Chronic Diseases separated by comma" /></Table.Td> : <Table.Td className="p-3 ">{arrayToCSV(profile.chronicDisease) ?? '-'}</Table.Td>}
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
