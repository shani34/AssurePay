import React from 'react';
import SignIn from './components/SignIn';
import Welcome from './components/welcome';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Import other components here

const App = () => {
  return (
   <Router>
    <Routes>
     <Route path="/" element={<SignIn/>}/>
     <Route path="/welcome"  element={<Welcome/>}/>
    </Routes>
   </Router>
  );
};

export default App;
