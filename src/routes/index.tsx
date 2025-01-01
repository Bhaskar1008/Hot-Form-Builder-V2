import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword';
import UserManagement from '../components/UserManagement/UserManagement';
import { FormBuilder } from '../components/HotFormBuilder';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/builder" element={<FormBuilder />} />
    </Routes>
  );
};

export default AppRoutes;