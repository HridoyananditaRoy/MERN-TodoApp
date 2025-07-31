const express = require('express');
const Note = require('../models/notes.models'); // correct path
// middleware/auth.js
const jwt = require('jsonwebtoken');


// ✅ Get all notes (GET /api/v1)

const getAllNotes = async (req, res) => {
  try {
    //Fetches only the authenticated user's notes.
    const notes = await Note.find({userId: req.user.id}).sort({createdAt:-1}); // get only user's notes
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Something went wrong while fetching notes." });
  }
};

// ✅ Create a note (POST /api/v1/create)
const createNotes = async (req, res) => {
  try {
    const { title, desc } = req.body;

    if (!title || !desc) {
      return res.status(400).json({ message: "Please provide both title and description" });
    }

    //Ties the note to the logged-in user.
    const newNote = new Note({ 
      title, 
      desc,
     userId: req.user.id
     });
    await newNote.save();

    return res.status(201).json({
      message: "Note created successfully",
      note: newNote,
    });
  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({ message: "Something went wrong while creating the note." });
  }
};

// ✅ Update a note (PUT /api/v1/update/:id)
const updateNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;

    if (!title || !desc) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // Only updates if the note belongs to the user.
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId: req.user.id},
       { title, desc }, 
       { new: true });

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Something went wrong while updating the note" });
  }
};



// ✅ Delete a note (PUT /api/v1/update/:id)
const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      userId: req.user.id  //check ownership
    });

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note deleted successfully",
      note: deletedNote,
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Something went wrong while deleting the note" });
  }
};


module.exports = {
    getAllNotes,
    createNotes,
    updateNotes,
    deleteNotes
};