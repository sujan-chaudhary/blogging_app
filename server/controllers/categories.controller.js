import Category from "../models/category.model.js";

export const create_category = async (req, res)=>{
    try{
        const {name, description} = req.body;
        const category = new Category({name, description});

        await category.save();
        res.status(201).send("category added successfully !")
    }
    catch(err){
        res.send("Inserting category error");
    }
}

