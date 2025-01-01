import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { login } from '../../services/apiService';

    const Login: React.FC = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const navigate = useNavigate();

      const handleLogin = async () => {
        const result = await login(email, password);
        if (result.success) {
          navigate('/dashboard');
        } else {
          alert(result.message);
        }
      };

      return (
        <div className="login-container">
          <h2>Login</h2>
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
          <button onClick={handleLogin}>Login</button>
          <div>
            <button onClick={() => navigate('/forgot-password')}>Forgot Password</button>
            <button onClick={() => navigate('/register')}>Register</button>
          </div>
        </div>
      );
    };

    export default Login;
