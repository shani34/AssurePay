import React, { useState } from 'react';
import axios from '../api/axios';
import  styles from './styles.module.css'
import Welcome from './welcome';
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
    <div className={styles.container}>
        <div className={styles.content}>
     <h1 className='assurepay'>Welcome to AssurePay</h1>
    {isLoggedIn ? ( // Conditionally render based on authentication status
        <Welcome username={username} />
      ):(
      <form onSubmit={isSignInForm ? handleSubmit : handleSignUp} className={styles.formContainer}>
      <div className={styles.errorMessage}>{errorMessage}</div>
        <div className={styles.group}>
          <input
            type="email"
            placeholder="Email"
            required="true"
            value={username}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.group}>
          <input
            type="password"
            placeholder="Password"
            required="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isSignInForm ? null : (  // Conditional rendering for retype password field
          <div  className={styles.group}>
            <input
              type="password"
              placeholder="Retype Password"
              required="true"
              value={repassword}
              onChange={(e) => retypePassword(e.target.value)}
            />
          </div>
        )}
        <div className={styles.button}>
        <button type="submit"  className={isSignInForm ? styles.signInButton : styles.signUpButton}>{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
          <button type="submit" onClick={toggleForm}>
            {isSignInForm ? 'Switch to Sign Up' : 'Switch to Sign In'}</button>
        </div>
      </form>
      )}
      </div>
    </div>
  );
};


export default SignIn;
