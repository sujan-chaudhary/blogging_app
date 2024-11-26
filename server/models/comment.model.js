import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true},
    blogPost: {type: mongoose.Schema.Types.ObjectId, ref: "BlogPost", required: true},
    createdAt: {type: Date, default: Date.now},
}, {timestamps: true});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;