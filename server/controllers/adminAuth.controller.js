import Admin from '../models/admin.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res)=>{
    const {username, password} = req.body;
    const user = await Admin.findOne({username});
    if(!user) return res.status(404).send("User not found !");
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).send("Invalid credentials !");

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
           expiresIn: "1h"
        }
    );
    
    res.cookie("token", token, {
        httpOnly: false // this httpOnly true makes token accessible only on server not on client or by js on client
      });
    res.status(200).send("Login successfully !");
}


export const logout = (req, res)=>{
    res.clearCookie("token");
    res.json({message: "Logout successfully !"});
}