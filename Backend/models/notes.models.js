const express = require('express');
const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
     title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  userId: {  //add a userId field to associate notes with users:
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true // Correct key
});

const Note = mongoose.model('Note',notesSchema);
module.exports = Note;

