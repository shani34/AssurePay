import React, { useState } from 'react';
import axios from '../api/axios';
import './styles.css'
const SignIn = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {          
        const data=JSON.stringify({
            username:username,
            password:password
        })
      const response = await axios.post('/api/signin',data,{
        withCredentials: true,
      });

     
       let token=response.data.cookie
       if (token){
        console.log(token)
        window.alert("successfully logged in")
       axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
       }else{
        console.log("user does not exist");
       }
      // Handle successful login
    } catch (error) {
        const statusCode=error.response.status
        if (statusCode === 200) {
            console.log('User logged in successfully');
            // Handle successful login
          } else if (statusCode === 401) {
            window.alert('Login failed: Invalid credentials');
            // Handle unauthorized access
          } else {
            window.alert('An error occurred');
            // Handle other error cases
          }
      setErrorMessage('An error occurred while logging in');
      // Handle login error
    }
  };

  return (
    <div className="container">
      <div className="error-message">{errorMessage}</div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={username}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
};


export default SignIn;
