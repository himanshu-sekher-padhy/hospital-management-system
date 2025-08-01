import React from 'react'
// import Header from '../Components/Header/Header'
// import Sidebar from '../Components/Sidebar/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Random from '../Components/Random';
import AdminDashboard from '../Layout/AdminDashboard';
import SigninPage from '../Pages/SigninPage';
import SignupPage from '../Pages/SignupPage';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import PatientDashboard from '../Layout/PatientDashboard';
import PatientProfilePage from '../Pages/Patient/PatientProfilePage';
import DoctorDashboard from '../Layout/DoctorDashboard';
import DoctorProfilePage from '../Pages/Doctor/DoctorProfilePage';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="signin" element={<PublicRoute><SigninPage /></PublicRoute>} />
                <Route path="signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
                <Route path="/" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
                    <Route path="/dashboard" element={<Random />} />
                    <Route path="/doctors" element={<Random />} />
                    <Route path="/patients" element={<Random />} />
                    <Route path="/appointments" element={<Random />} />
                    <Route path="/pharmacy" element={<Random />} />
                    
                </Route>
                <Route path="/patient" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>}>

                    <Route path="dashboard" element={<Random />} />
                    <Route path="profile" element={<PatientProfilePage />} />
                    <Route path="appointments" element={<Random />} />
                    
                </Route>
                <Route path="/doctor" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>}>

                    <Route path="dashboard" element={<Random />} />
                    <Route path="profile" element={<DoctorProfilePage />} />
                    <Route path="patients" element={<Random />} />
                    <Route path="appointments" element={<Random />} />
                    <Route path="pharmacy" element={<Random />} />
                    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
