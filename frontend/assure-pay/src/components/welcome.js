import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './welcome.module.css';

const Welcome = () => {
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/welcome", {
        withCredentials: true,
      })
      .then((response) => {
        setWelcomeMessage(response.data);
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
        <h1>Welcome!</h1>
        <p>{welcomeMessage}</p>
        <div className={styles.button}>
          <button className={styles.actionButton}>Create New Account</button>
          <button className={styles.actionButton}>Transaction History</button>
          <button className={styles.actionButton}>Update User Details</button>
          <button className={styles.actionButton}>Check Balance</button>
      </div>
      <footer className={styles.button}>
        <p>&copy; 2023 AssurePay. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Welcome;
