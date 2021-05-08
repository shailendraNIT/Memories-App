import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

app.use(cors());

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.get('/',(req,res)=>{
    res.send('Hey,welcome to the memogram-app||This is our backend');
})
app.use('/posts', postRoutes);


const PORT=process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
.then(()=>app.listen(PORT,()=>{
    console.log(`server is up and running at port: ${PORT}`);
}))
.catch((e)=>console.log(e));
