import React from 'react';
import '../../styles/admin/login.css';
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const LoginAdmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
    const loginAdmin = async(e)=>{
      e.preventDefault();

      const response = await axios.post("http://localhost:3000/admin/login",
        {
          username, 
          password
        }
        ,{
          withCredentials: true, // browser can not accept cookies without credentials
        }
      );
      setTimeout(()=>{
        if(response.status === 200){
          navigate("/admin/dashboard");
        }
      }, 2000)
    }
  return (
    <div>
        <form onSubmit={loginAdmin}>
          <h1>Login</h1>
            <label htmlFor='username'>Username</label>
            <input type="text" name='username' className='username' onChange={(e)=>{setUsername(e.target.value)}}/>
            <label htmlFor="password">Password</label>
            <input type="text" name='password' className='password' onChange={(e)=>{setPassword(e.target.value)}}/>
            <input type="submit" name='SUBMIT' />
        </form>
    </div>
  )
}

export default LoginAdmin