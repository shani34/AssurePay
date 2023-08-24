// Balance.js

import React, { useState } from 'react';
import axios from 'axios';
import styles from './balance.module.css';

const Balance = () => {
  const [balance, setBalance] = useState(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBalance = () => {
    setLoading(true);

    // Send accountNumber to the backend API
    try{
     const response=axios.get(`http://localhost:8080/api/transaction/${accountNumber}`, {withCredentials:true})
      .then(response => {
        setBalance(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching balance:', error);
        setLoading(false);
      });

      if(response.data===''){
        console.error("does not exist this account")
      }
      setBalance(null);
      setLoading(true);
  }catch(error){
     console.log(error)
  }
};

  return (
    <div className={styles.BackGround}>
    <div className={styles.balanceContainer}>
      <h2>Enter Account Number</h2>
      {balance !== null ? (
        <p className={styles.balanceAmount}>INR {balance}</p>
      ) : (
        <p>Loading balance...</p>
      )}

      <div className={styles.accountInput}>
        <input
          type="text"
          placeholder="Enter Account Number"
          value={accountNumber}
          onChange={e => setAccountNumber(e.target.value)}
        />
        <button onClick={fetchBalance} className={styles.fetchButton} disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch Balance'}
        </button>
      </div>
    </div>
    <footer className={styles.footer}>
          <p>&copy; 2023 AssurePay. All rights reserved.</p>
    </footer>
    </div>
  );
};

export default Balance;
