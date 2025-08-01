import React from 'react'
import Sidebar from '../Components/Doctor/Sidebar/Sidebar'
import Header from '../Components/Header/Header'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
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

export default AdminDashboard
