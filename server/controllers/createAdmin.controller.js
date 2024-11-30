import Admin from '../models/admin.model.js';


export const create_admin = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const newAdmin = new Admin({ username, password, role });
        await newAdmin.save();
        res.status(201).send("Admin added successfully !");
    }
    catch (err) {
        console.log(err);
    }
}