import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
    title:{type: String, required: true},
    content: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true},
    tags: [String],
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    likes: {type: Number, default: 0},
}, {timestamps: true});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;