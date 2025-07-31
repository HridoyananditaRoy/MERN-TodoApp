const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB =async()=>{ 
    await mongoose.connect(process.env.MONGO_URI,
    {
          useNewUrlParser: true,
         useUnifiedTopology: true,
    }
).then(()=>{
     console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log('Error connecting to the db', err);
     process.exit(1); // Optional: stop the app if DB connection fails
})
};

module.exports = connectDB;
