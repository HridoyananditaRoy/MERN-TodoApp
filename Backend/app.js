const express = require('express');
require('dotenv').config();
const app = express();
const notesRoutes = require('./routes/notes.routes');
const userRoutes = require('./routes/user.routes.js')
const connectDB = require('./database/db');
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:5173', 'https://mern-todoapp-frontend-2bnw.onrender.com'],
  credentials: true,
}));
app.use(express.json());

app.use('/api/v1/user', userRoutes); 
app.use('/api/v1', notesRoutes)

connectDB();

const conn = process.env.PORT || 8000;

app.listen(conn, ()=>{
    console.log(`Server listening on port ${conn}`);
})
