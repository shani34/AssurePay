import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './welcome.module.css';
import user from '../logo/AssurePay.png'
import About from './about'

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
            <a href="/about" onClick={About} >About</a>
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
          <button className={styles.actionButton}>Create New Account</button>
          <button className={styles.actionButton}>Transaction History</button>
          <button className={styles.actionButton}>Update Details</button>
          <button className={styles.actionButton}>Check Balance</button>
        </div>
        <footer className={styles.footer}>
          <p>&copy; 2023 AssurePay. All rights reserved.</p>
        </footer>
      </div>
   </div>
  );
};

export default Welcome;
