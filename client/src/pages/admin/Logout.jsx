import React from 'react'
import {useEffect} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        const logout = async ()=>{
            const response = await axios.post("http://localhost:3000/admin/logout", {}, {withCredentials: true});
            console.log(response.data);
            if(response.status === 200){
                return navigate("/admin/login");
            }
        }
        logout();
    }, [])
}

export default Logout