import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
    try {
        const { username, email, password, profilePicture, bio } = req.body;
        const user = await User.findOne({email});
        console.log("Hello world")
        if(user){
            return res.status(400).json({message: "User already exists !"});
        }
        const newUser = new User({ username, email, password, profilePicture, bio });
        await newUser.save();
        // creation of token
        res.status(201).send(newUser);
    }
    catch (err) {
        console.log("Failed to create a user ! ", err);
    }
}

export const get_all_users = async (req, res)=>{
    try{
        const users = await User.find();
        res.status(200).send(users);
    }catch(err){
        console.log("Can not get all users", err);
    }
}

export const login = async (req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Password does not matched !"});
        }
        // creation of token 
        res.status(200).json({message: "Login successfully !"});
    }
    catch(err){
        console.log("Can not login", err);
    }
}

