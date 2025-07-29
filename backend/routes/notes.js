const express = require('express');
const Note = require('../models/note');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user's notes
router.get('/', auth, async (req, res) => {
  const notes = await Note.find({ user: req.user.userId });
  res.json(notes);
});

// Create note
router.post('/', auth, async (req, res) => {
  const note = new Note({ ...req.body, user: req.user.userId });
  await note.save();
  res.status(201).json(note);
});

// Update note
router.put('/:id', auth, async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.user.userId },
    req.body,
    { new: true }
  );
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

// Delete note
router.delete('/:id', auth, async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json({ message: 'Note deleted' });
});

module.exports = router;