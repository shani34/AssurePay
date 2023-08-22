import React from 'react';
import SignIn from './components/SignIn';
import { IsAuthenticated } from './components/SignIn';
import Welcome from './components/welcome';
import About from './components/about'
import CreateAccountForm from './components/Accounts';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
// Import other components here


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/welcome" element={true? <Welcome />:<Navigate to="/"/>} />
        <Route path="/about" element={true? <About />:<Navigate to="/"/>} />
        <Route path="/createAccount" element={true?<CreateAccountForm />:<Navigate to="/"/>} />
      </Routes>
    </Router>
  );
};

export default App;
