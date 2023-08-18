import React, { useState } from 'react';
// import bankLogo from './bank-logo.png'; // Import your logo image

const CreateAccountForm = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [dob, setDob] = useState('');
  const [nominee, setNominee] = useState('');
  const [balance, setBalance] = useState('');
  const [bankName, setBankName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <div className="create-account-form">
      {/* <img src={bankLogo} alt="Bank Logo" className="logo" /> */}
      <h2>Create a New Bank Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Account Number:</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Account Holder:</label>
          <input
            type="text"
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nominee:</label>
          <input
            type="text"
            value={nominee}
            onChange={(e) => setNominee(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Initial Balance:</label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Bank Name:</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccountForm;
