import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to import Axios

const Welcome = ()=>{
    const [welcomeMessage, setWelcomeMessage]=useState('');

    useEffect(()=>
    {
        axios.get("http://localhost:8080/api/welcome",{
            withCredentials:true,
        }).then(response=>{
            setWelcomeMessage(response.data)
        }).catch(error=>{
            if(error.response && error.response.status){
                console.log(error.response.status)
            }
            console.error("error from backend")
        })
    },[])

  return (
    <div>
      <h1>Welcome!</h1>
     <p>{welcomeMessage}</p>
    </div>
  );
};

export default Welcome;
