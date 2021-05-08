import  mongoose  from 'mongoose';
import postMessage from '../models/postMessage.js';

export const getPosts=async (req,res)=>{
    try {
        const postMessages= await postMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const createPost=async (req,res)=>{
    const post=req.body;
    const newPost=new postMessage(post);
    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        console.log(error.message);
        res.status(409).json({message:error.message});
    }
}

export const updatePost=async (req,res)=>{
    const {id}=req.params;

    const post=req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).message('No post with this id');
    }

    try {
        const updatedPost=await postMessage.findByIdAndUpdate(id,post,{new:true});
        res.json(updatedPost);
    } catch (error) {
        console.log(error)
    }
}

export const deletePost=async (req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send(`No post with this id: ${id}`);
    }
    try {
        await postMessage.findByIdAndRemove(id);

        res.json({message:'Post deleted successfully'});  
    } catch (e) {
        console.log(e);
    }
    
}

export const likePost=async (req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with this id: ${id}`);
    
    try {
        const post = await postMessage.findById(id);

        const updatedPost = await postMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
        
        res.json(updatedPost);
    } catch (e) {
        console.log(e);
    }
}

