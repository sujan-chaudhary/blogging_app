import React, {useState} from 'react'
import axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:3000/users/login",
                {
                     email, password
                },
                {
                    withCredentials: true
                }
            )
            if(response.status===200){
                console.log("Login successfully !");
            }
        
        }catch(err){
            console.log("Can not login ", err);
        }

    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="text" name='email' onChange={(e)=>{setEmail(e.target.value)}}/>
            <label htmlFor="password">Password:</label>
            <input type="text" name='password' onChange={(e)=>{setPassword(e.target.value)}}/>
            <input type="submit" name='Login' />
        </form>
    </div>
  )
}

export default Login