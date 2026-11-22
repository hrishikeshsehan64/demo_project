const express = require("express");
const { cache, clearCache, getCacheStats } = require("express-cache-kit");

const app = express();
app.use(express.json());

let notes = require("./notes");

// Get all notes (cached for 30 seconds)
app.get("/notes", cache(30), (req, res) => {
  res.json(notes);
});

// Get note by ID (cached for 30 seconds)
app.get("/notes/:id", cache(30), (req, res) => {
  const note = notes.find(n => n.id === Number(req.params.id));

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
});

// Create a note
app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content required" });
  }

  const note = {
    id: notes.length ? Math.max(...notes.map(n => n.id)) + 1 : 1,
    title,
    content
  };

  notes.push(note);
  clearCache();

  res.status(201).json(note);
});

// Delete a note
app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = notes.findIndex(n => n.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  const deleted = notes.splice(index, 1)[0];
  clearCache();

  res.json({ message: "Note deleted", deleted });
});

// Cache stats
app.get("/stats", (req, res) => {
  res.json(getCacheStats());
});

app.listen(3000, () => {
  console.log("Notes API running on http://localhost:3000");
});