import {useState, useEffect} from 'react';
import axios from '../api/axios'

const Users = () => {
    const [users, setUsers]=useState();

    useEffect(()=>{
      let isMounted=true;
      const controller=new AbortController();
      
      const getUsers =async()=>{
        try {

          const response=await axios.Get('/users',{
            signal: controller.signal
          });
          console.log(response.data);
          isMounted && setUsers(response.data);
        }catch(err){
          console.log(err)
        }
      }
      return ()=>{
        isMounted=false;
        controller.abort();

      }
      getUsers();

    },[])
  return (
    <article>
      <h2>users list</h2>
      {users?.length
      ? (
        <ul>
          {users.map((user,i)=><li key={i}>{user?.
          username}</li>)}
        </ul>
      ): <p>No users to display</p>
      }   
    </article>
  );
};

export default Users;
