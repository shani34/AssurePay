import React, { useState } from 'react';
import axios from '../api/axios';
import './styles.css'
import Welcome from './welcome';
// import SignUp from './SignUp';
const SignIn = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [repassword, retypePassword] = useState('');
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [isLoggedIn, setLoggedIn]=useState(false);
  const toggleForm = () => {
    setIsSignInForm((prevIsSignInForm) => !prevIsSignInForm);
  };
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
        setLoggedIn(true)
        window.alert("successfully logged in")
       axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
       }else{
        console.log("user does not exist");
       }
      // Handle successful login
    } catch (error) {
        if (error.response && error.response.status) {
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
        }
      setErrorMessage('An error occurred while logging in');
      // Handle login error
    } 
  };

  const handleSignUp= async (e) => {
    e.preventDefault();
    try {      
        if (password!==repassword){
            window.alert("password is not matching")
        }    
        const data=JSON.stringify({
            username:username,
            password:password
        })
     await axios.post('/api/signup',data,{
        withCredentials: true,
      });

        window.alert("successfully registered!"); 
    } catch (error) {
        if (error.response && error.response.status) {
        const statusCode=error.response.status
        if (statusCode === 200) {
            console.log('successfully registered!');
            // Handle successful login
          } else if (statusCode === 401) {
            window.alert('Login failed: Invalid credentials');
            // Handle unauthorized access
          } else {
            window.alert('An error occurred');
            // Handle other error cases
          }
        }
      setErrorMessage('An error occurred while logging in');
      // Handle login error
    } 
  };

  return (
    <div className="container">
    {isLoggedIn ? ( // Conditionally render based on authentication status
        <Welcome username={username} />
      ):(
      <form onSubmit={isSignInForm ? handleSubmit : handleSignUp} className="form-container">
      <div className="error-message">{errorMessage}</div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            required="true"
            value={username}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            required="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isSignInForm ? null : (  // Conditional rendering for retype password field
          <div className="input-group">
            <input
              type="password"
              placeholder="Retype Password"
              required="true"
              value={repassword}
              onChange={(e) => retypePassword(e.target.value)}
            />
          </div>
        )}
        <div className="button-container">
        <button type="submit"  className={isSignInForm ? 'sign-in-button' : 'sign-up-button'}>{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
          <button type="submit" onClick={toggleForm}>
            {isSignInForm ? 'Switch to Sign Up' : 'Switch to Sign In'}</button>
        </div>
      </form>
      )}
    </div>
  );
};


export default SignIn;
