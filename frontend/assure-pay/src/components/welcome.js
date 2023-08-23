import React, { useEffect } from 'react';
import axios from 'axios';
import styles from './welcome.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import user from '../logo/AssurePay.png'

const Welcome = () => {

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/welcome", {
        withCredentials: true,
      })
      .then((response) => {
            console.log(response.data)
      })
      .catch((error) => {
        if (error.response && error.response.status) {
          console.log(error.response.status);
        }
        console.error("error from backend");
      });
  }, []);



  return (

    <div className={styles.welcome}>
       <header className={styles.header}>
        <img
          src={user}
          alt="AssurePay Logo"
          className={styles.logo}
        />
        </header>
      <div className={styles.sidebar}>
      <nav className={styles.sidebar}>
        <ul className={styles.navLinks}>
        <li>
            <a href="/welcome"  >Home</a>
         </li>  
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/career">Career</a>
          </li>
          <li>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      </nav>
      </div>
      <div className={styles.content}>
        <h1>Welcome!</h1>
        <div className={styles.button}>
           <a href='/createAccount'>
          <button className={styles.actionButton} >Create New Account</button>
          </a>
          <a href='/transaction'>
          <button className={styles.actionButton}>Transaction History</button>
          </a>
          <a href='/updateDetails'>
          <button className={styles.actionButton}>Update Details</button>
          </a>
          <a href='/checkBalance'>
          <button className={styles.actionButton}>Check Balance</button>
          </a>
        </div>
        <div className={styles.followUs}>
        <p>Follow us on:</p>
        <div className={styles.socialMedia}>
          <a href="https://facebook.com" className={styles.socialLink}>
            <FontAwesomeIcon icon={faFacebook} className={styles.icon}/>
          </a>
          <a href="https://twitter.com" className={styles.socialLink}>
            <FontAwesomeIcon icon={faTwitter} className={styles.icon}/>
          </a>
          <a href="https://instagram.com" className={styles.socialLink}>
            <FontAwesomeIcon icon={faInstagram}className={styles.icon}/>
          </a>
        </div>
        </div>
        <footer className={styles.footer}>
          <p>&copy; 2023 AssurePay. All rights reserved.</p>
        </footer>
      </div>
   </div>
  );
};

export default Welcome;
