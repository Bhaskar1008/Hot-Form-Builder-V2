import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import Login from './components/Login/Login';
    import Register from './components/Register/Register';
    import ForgotPassword from './components/ForgotPassword/ForgotPassword';
    import UserManagement from './components/UserManagement/UserManagement';

    const App: React.FC = () => {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/user-management" element={<UserManagement />} />
          </Routes>
        </Router>
      );
    };

    export default App;
