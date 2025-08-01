import React from 'react';
import {
    IconCalendarCheck,
    IconHeartbeat,
    IconLayoutGrid,
    IconUser,
    IconUserHeart,
    IconVaccine,
} from '@tabler/icons-react';
import { Avatar, Text } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const links = [
    { name: 'Dashboard', url: '/doctor/dashboard', icon: <IconLayoutGrid stroke={2} /> },
    { name: 'Profile', url: '/doctor/profile', icon: <IconUser stroke={2} /> },
    { name: 'Patients', url: '/doctor/patients', icon: <IconUserHeart stroke={2} /> },
    { name: 'Appointments', url: '/doctor/appointments', icon: <IconCalendarCheck stroke={2} /> },
    { name: 'Pharmacy', url: '/doctor/pharmacy', icon: <IconVaccine stroke={2} /> },
    
];

const Sidebar = () => {
    const user= useSelector((state:any)=>state.user);
    return (
        <div className='flex'>
            <div className='w-64'>
            </div>
            <div className='w-64 fixed h-screen bg-red-200 flex flex-col gap-7 items-center overflow-y-auto hide-scrollbar'>

                {/* Logo */}
                <div className='fixed z-[500] py-3 bg-red-200 text-red-600 flex gap-1 items-center'>
                    <IconHeartbeat size={40} stroke={2.5} />
                    <span className='font-heading text-2xl font-bold'>Med Care</span>
                    <span className='font-bold text-lg align-super'>+</span>
                </div>

                <div className="flex flex-col gap-5 mt-20">
                    {/* Profile */}
                    <div className='flex flex-col items-center gap-2'>
                        <div className='p-0.5 bg-white rounded-full shadow-lg '>
                            <Avatar variant='filled' src='/avatar.jpg' size='xl' alt='Banita Padhy' />
                        </div>
                        <span className='text-lg text-center font-medium leading-tight pt-1'>{user.name}</span>
                        <Text c='gray.7' size='sm'>{user.role}</Text>
                    </div>

                    {/* Navigation Links */}
                    <div className='flex flex-col gap-1 w-full px-4'>
                        {links.map((link) => (
                            <NavLink
                                to={link.url}
                                key={link.url}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 w-full font-medium text-neutral-900 px-8 py-5 rounded-lg 
              ${isActive ? 'bg-red-400 text-white' : 'transition-all duration-200 ease-in-out transform hover:bg-red-300 hover:scale-105 hover:text-white'
                                    }`
                                }
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
