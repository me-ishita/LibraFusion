import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../authService';
import './Form.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password, userType });

      
      if (response.data.userType === 'admin') {
        localStorage.setItem('user', JSON.stringify(response.data.data))
        navigate('/adminhome');
      } else {
        console.log(response.data);
        
        localStorage.setItem('user', JSON.stringify(response.data.data))
        navigate('/userhome');
      }
    } catch (error) {
      console.error(error);
      alert('Error logging in');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="userType">Select Type</label>
          <select id="userType" value={userType} onChange={(e) => setUserType(e.target.value)} required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
      <p>Don't have an account? <a href="/signup">Register Here</a></p>
      <p>Forget Password <a href="/forget-password">Click Here</a></p>
    </div>
  );
}

export default Login;
