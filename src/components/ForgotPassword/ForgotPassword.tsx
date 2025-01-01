import React, { useState } from 'react';

    const ForgotPassword: React.FC = () => {
      const [email, setEmail] = useState('');

      const handleForgotPassword = async () => {
        // Implement forgot password logic here
      };

      return (
        <div className="forgot-password-container">
          <h2>Forgot Password</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleForgotPassword}>Reset Password</button>
        </div>
      );
    };

    export default ForgotPassword;
