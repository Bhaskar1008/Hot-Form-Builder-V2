import React, { useState } from 'react';
    import { register } from '../../services/apiService';

    const Register: React.FC = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [role, setRole] = useState('user');

      const handleRegister = async () => {
        const result = await register(email, password, role);
        if (result.success) {
          alert('Registration successful');
        } else {
          alert(result.message);
        }
      };

      return (
        <div className="register-container">
          <h2>Register</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleRegister}>Register</button>
        </div>
      );
    };

    export default Register;
