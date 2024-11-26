import BlogPost from '../models/blogPost.model.js';

// create post

export const create_post = async(req, res)=>{
    try{
        const {title, content, author, tags, category} = req.body;
        const post = new BlogPost({title, content, author, tags, category});
        await post.save();
        res.status(201).send("added successfully !");
    }
    catch(err){
        console.log(err);
    }
}

// get all post 

export const get_all_posts = async (req, res)=>{
    try{
        const users = await BlogPost.find();
        res.status(200).json(users);
    }catch(err){
        console.log("Can not get all users", err);
    }
}

// get a post

export const get_a_post = async (req, res)=>{
    try{
        const post = await BlogPost.findById(req.params.id);
        if(!post){
            return res.status(404).send("post not found!");
        }
        res.status(200).send(post);
    }
    catch(err){
        res.status(500).json({message: "server error"});
    }
}

