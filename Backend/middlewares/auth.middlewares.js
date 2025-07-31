// 'const express = require('express');
// const jwt = require('jsonwebtoken');

// //This middleware will decode the JWT and attach the user info to req.user
// const authenticatedUser = async(req,res,next)=>{
//     const token =  await req.headers.authorization?.split(' ')[1];
//     if(!token){
//         return res.status(401).json({
//             error: 'Access denied. No token provided.' 
//         })
//     }

//     try{
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified; // user id will be available as req.user.id
//         next();

//     }catch(err){
//         res.status(400).json({ error: 'Invalid token' });
//     }
// }

// module.exports = {authenticatedUser};



const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

const authenticatedUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing or invalid" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token extracted from header:", token);

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports= {authenticatedUser};