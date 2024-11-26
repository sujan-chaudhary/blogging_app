import express from 'express';

import {create_post, get_all_posts, get_a_post} from '../controllers/posts.controller.js';
const router = express.Router();
// create a post 

router.post("/create_post", create_post);

//get all the posts

router.get("/get_all_posts", get_all_posts);

// get a post

router.get("/get_a_post/:id", get_a_post);

export default router;