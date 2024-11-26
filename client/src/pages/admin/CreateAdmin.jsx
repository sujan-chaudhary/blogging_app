import React from 'react';
import '../../styles/admin/login.css';
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const CreateAdmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
    const createAdmin = async(e)=>{
      e.preventDefault();

      const response = await axios.post("http://localhost:3000/admin/create_admin",
        {
          username, 
          password,
          role
        }
        ,{
          withCredentials: true, // browser can not accept cookies without credentials
        }
      );
      console.log("code is here!")
      setTimeout(()=>{
        if(response.status === 201){
          navigate("/admin/dashboard");
        }
      }, 2000)
    }
  return (
    <div>
        <form onSubmit={createAdmin}>
          <h1>Add admin ?</h1>
            <label htmlFor='username'>Add username: </label>
            <input type="text" name='username' className='username' onChange={(e)=>{setUsername(e.target.value)}}/>
            <label htmlFor="password">Add password: </label>
            <input type="text" name='password' className='password' onChange={(e)=>{setPassword(e.target.value)}}/>
            <label htmlFor="password">Add role: </label>
            <input type="text" name='role' className='role' onChange={(e)=>{setRole(e.target.value)}}/>
            <input type="submit" name='SUBMIT' />
        </form>
    </div>
  )
}

export default CreateAdmin