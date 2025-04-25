import axios from 'axios';

const API_URL = 'http://localhost:5007/api/auth';

// For signup
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    alert('You are successfully registered');
    return response;
  } catch (error) {
    console.error(error);
    alert('Error registering user');
    
  }
};

// For login
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    alert('Login successful');
    return response;
  } catch (error) {
    console.error(error);
    alert('Error logging in');
    
  }
};




