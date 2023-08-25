import React from 'react';
import SignIn from './components/SignIn';
// import { IsAuthenticated } from './components/SignIn';
import Welcome from './components/welcome';
import About from './components/about'
import CreateAccountForm from './components/Accounts';
import Transaction from './components/transaction';
import CareerPage from './components/career';
import Balance from './components/balance';
import Protected from './components/protected';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
// Import other components here


const App = () => {
  let isAuth=localStorage.getItem('login')
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/welcome"element={<Protected Component={Welcome}/>} />
        <Route path="/about" element={<Protected Component={About}/>} />
        <Route path="/createAccount" element={<Protected Component={CreateAccountForm}/>} />
        <Route path='/transaction'element={<Protected Component={Transaction}/>}/>
        <Route path='/career'element={<Protected Component={CareerPage}/>}/>
        <Route path='/checkBalance'element={<Protected Component={Balance}/>}/>

      </Routes>
    </Router>
  );
};

export default App;
