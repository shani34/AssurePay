import React, { useState } from 'react';
import CreateForm from'./account.module.css'
import styles from './welcome.module.css';
import {useNavigate} from 'react-router-dom'
// import bankLogo from './bank-logo.png'; // Import your logo image

const CreateAccountForm = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [dob, setDob] = useState('');
  const [nominee, setNominee] = useState('');
  const [balance, setBalance] = useState('');
  const [bankName, setBankName] = useState('');
  const [adhaar, setAdhaar]=useState('');
  const navigate =useNavigate();
  const bankNames = ['Bank A', 'Bank B', 'Bank C', 'Bank D'];
  const [errorMessages, setErrorMessages] = useState({
    accountNumber: '',
    accountHolder: '',
    dob: '',
    nominee: '',
    balance: '',
    bankName: '',
    adhaar: '',
  });
  const handleSubmit = (e) => {
    const errors={};
    e.preventDefault();
    try{
    if (accountNumber.length<14){
        errors.accountNumber="Invalid length of account number";
    }
    if (adhaar.length<14){
      errors.adhaar="Invalid length of adhar number number";
     
    }
    const dobDate = new Date(dob);
    const yearOfBirth = dobDate.getFullYear();
    const currentYear=new Date().getFullYear();
    if(yearOfBirth>currentYear){
      errors.dob="Invalid length of DOB number";
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return; // Return early if any required field is missing
    }
    // Here you can perform actions like sending the form data to a server or updating state
    console.log('Form submitted:', {
      accountNumber,
      accountHolder,
      dob,
      nominee,
      balance,
      bankName,
    });
    // Clear the form fields
    setAccountNumber('');
    setAccountHolder('');
    setDob('');
    setNominee('');
    setBalance('');
    setBankName('');
    setAdhaar('');

    window.alert("form successfully submitted!");
    navigate('/welcome');
  } catch(error){
        console.error(error);
        return;
    }
  };

  return (
    <div className={CreateForm.BackGround}>
    <div className={CreateForm.createAccountForm}>
      {/* <img src={bankLogo} alt="Bank Logo" className="logo" /> */}
      <h2>Create a New Bank Account</h2>
      <form onSubmit={handleSubmit}>
        <div>{errorMessages.accountNumber}
          <label>Full Name:</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>
        <div>{errorMessages.accountHolder}
          <label>Account Holder:</label>
          <input
            type="text"
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
            required
          />
        </div>{errorMessages.dob}
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div>{errorMessages.nominee}
          <label>Nominee:</label>
          <input
            type="text"
            value={nominee}
            onChange={(e) => setNominee(e.target.value)}
            required
          />
        </div>
        <div>{errorMessages.adhaar}
          <label>Adhaar No.</label>
          <input
            type="text"
            value={adhaar}
            onChange={(e) => setAdhaar(e.target.value)}
            required
          />
        </div>
        <div>{errorMessages.balance}
          <label>Initial Balance:</label>
          <input
            type="number"
            value={balance}
            placeholder='min balance : 2500'
            onChange={(e) => setBalance(e.target.value)}
            required
          />
        </div>
        <div>{errorMessages.bankName}
          <label>Bank Name:</label>
          <select
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          >
            <option value="" disabled>Select a bank</option>
            {bankNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" >Create Account</button>
      </form>
    </div>
    <footer className={styles.footer}>
          <p>&copy; 2023 AssurePay. All rights reserved.</p>
    </footer>
    </div>
  );
};

export default CreateAccountForm;
