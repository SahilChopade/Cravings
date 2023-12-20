require('dotenv').config();
const express = require('express');
const cors  = require('cors');
const {connectDB} = require('./db');

const app = express();
app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ limit: '50mb' }));




connectDB();
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server started on Port ${process.env.PORT}`);
})