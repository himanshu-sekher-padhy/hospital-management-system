import React, { useEffect } from 'react'
import { ActionIcon, Button } from '@mantine/core';
import { IconBellRingingFilled, IconLayoutSidebarLeftCollapseFilled } from '@tabler/icons-react';
import ProfileMenu from './ProfileMenu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeJwt } from '../../Slices/JwtSlice';
import { removeUser } from '../../Slices/UserSlice';

const Header = () => {
    const dispatch= useDispatch();
    const jwt= useSelector((state:any)=>state.jwt);
    const handleSignout=()=>{
        console.log("Signed Out")
        dispatch(removeJwt());
        dispatch(removeUser());

    }
    return (
        <div className='bg-cyan-100 shadow-lg h-16 flex justify-between pr-5 pl-2 items-center'>
            <ActionIcon
                variant="transparent"
                aria-label="Settings"
                size="lg">
                <IconLayoutSidebarLeftCollapseFilled stroke={1.5} style={{ width: '70%', height: '70%' }} />
            </ActionIcon>
            <div className='flex gap-5 items-center'>
                {jwt?<Button color='red' onClick={handleSignout}>Sign Out</Button>:<Link to="/signin"><Button>Sign in</Button></Link>}
                {jwt&&<><ActionIcon
                    variant="transparent"
                    aria-label="Settings"
                    size="md">
                    <IconBellRingingFilled stroke={1.5} style={{ width: '85%', height: '85%' }} />
                </ActionIcon>
                <ProfileMenu /></>}
            </div>

        </div>
    )
}

export default Header
