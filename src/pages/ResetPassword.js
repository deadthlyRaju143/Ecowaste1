import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Reuse styles

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return setMessage('Password must be at least 6 characters.');
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
        password,
      });
      setMessage(res.data.message);
      alert('✅ Password reset successful. Please login.');
      navigate('/login');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Reset failed');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Reset Your Password</h2>
      <div className="login-box">
        {message && <div className="login-error">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">Reset Password</button>
        </form>
      </div>
    </div>
  );
}
