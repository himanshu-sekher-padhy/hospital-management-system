import React from 'react'
import Header from '../Components/Header/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Patient/Sidebar/Sidebar'

const PatientDashboard = () => {
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

export default PatientDashboard
