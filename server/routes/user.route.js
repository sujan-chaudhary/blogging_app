import express from "express";
import {signup, login, get_all_users} from '../controllers/user.controller.js'
const router = express.Router();


// get all users
router.get("/", get_all_users);

router.post("/signup", signup);
router.post("/login", login);

export default router;

