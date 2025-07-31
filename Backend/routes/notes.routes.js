const express = require('express');
const router = express.Router();
const {getAllNotes, createNotes, updateNotes, deleteNotes} = require("../controllers/notes.controllers.js");
const {authenticatedUser} = require('../middlewares/auth.middlewares.js')

router.get('/get',authenticatedUser, getAllNotes);
router.post('/create', authenticatedUser, createNotes);
router.put('/update/:id',authenticatedUser,updateNotes); // Update a specific note by ID
router.delete('/delete/:id',authenticatedUser,deleteNotes);

module.exports = router;