import React from 'react'
import Header from '../Components/Header/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Doctor/Sidebar/Sidebar'

const DoctorDashboard = () => {
  return (
    <div>
      <div className='flex'>
                <Sidebar />
                <div className='w-full flex flex-col'>
                    <Header />
                    <Outlet/>
                </div>
            </div>
    </div>
  )
}

export default DoctorDashboard
