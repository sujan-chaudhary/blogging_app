import React, {useState} from 'react'
import axios from 'axios';

const Signup = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profile_picture, setProfilePicture] = useState("");
    const [bio, setBio] = useState("");
    console.log(username, email)

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:3000/users/signup",
                {
                    username, email, password, profile_picture, bio
                },
                {
                    withCredentials: true
                }
            )
            if(response.status===201){
                console.log("User added successfully !");
            }
        
        }catch(err){
            console.log("Can not add user ", err);
        }

    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" name='username' onChange={(e)=>{setUsername(e.target.value)}}/>
            <label htmlFor="email">Email:</label>
            <input type="text" name='email' onChange={(e)=>{setEmail(e.target.value)}}/>
            <label htmlFor="password">Password:</label>
            <input type="text" name='password' onChange={(e)=>{setPassword(e.target.value)}}/>
            <label htmlFor="profile_picture">Profile Picture</label>
            <input type="text" name='profile_picture' onChange={(e)=>{setProfilePicture(e.target.value)}}/>
            <label htmlFor="bio">Bio:</label>
            <input type="text" name='bio' onChange={(e)=>{setBio(e.target.value)}}/>
            <input type="submit" name='submit' />
        </form>
    </div>
  )
}

export default Signup