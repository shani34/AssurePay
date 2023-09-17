
import React, { useState } from "react";
import CreateForm from'./account.module.css'
import styles from './welcome.module.css';
import axios from "../api/axios";


const Transaction=()=>{

    const[SenderaccountNumber, setSenderAccountNumber]=useState('');;
    const[RecieveraccountNumber, setRecieverAccountNumber]=useState('');;
    const[amount, setAmount]=useState('');;
    const[message, setMessage]=useState('');
    const messages=["withdraw","credit"];
    const handleSubmit=(e)=>{
        e.preventDefault();
            try{
            const data=JSON.stringify({
                sender: parseInt(SenderaccountNumber),
                receiver: parseInt(RecieveraccountNumber),
                amount: parseFloat(amount),
                message: message
            })
            const response=axios.post("/api/transaction",data,{
                withCredentials:true
            })

            console.log((response).data)
            //removing the value
            setSenderAccountNumber('');
            setAmount('');
            setMessage('');
            setRecieverAccountNumber('');

        }catch(error){

            console.log(error)
        }
    };


    return(
        <div className={CreateForm.BackGround}>
             <div className={CreateForm.createAccountForm}>
                <form onSubmit={handleSubmit}>
                <div>
                <label> Sender Account Number</label>
                <input
                  type="number"
                  value={SenderaccountNumber}
                  onChange={(e)=>setSenderAccountNumber(e.target.value)}
                />
                </div>
                <div>
                <label> Receiver Account Number</label>
                <input
                  type="number"
                  value={RecieveraccountNumber}
                  onChange={(e)=>setRecieverAccountNumber(e.target.value)}
                />
                </div>
                <div>
                    <label>Amount</label>
                    <input
                    type="number"
                    value={amount}
                    onChange={(e)=>setAmount(e.target.value)}
                    />
                </div>
                <div>
                    <label>Message</label>
                   <select
                    type="text"
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                    >
                     <option>Select Message</option>{
                        messages.map((name, index)=>
                        <option key={index} value={name}>
                            {name}
                        </option>
                        )
                     }   
                    </select>
                 </div>
                 <button type="submit" >Make Transaction</button>
                </form>
             </div>
        <footer className={styles.footer}>
          <p>&copy; 2023 AssurePay. All rights reserved.</p>
        </footer>
        </div>

    );
};

export default Transaction;