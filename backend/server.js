const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Todo schema
const todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    done: { type: Boolean, default: false },
    title: String,
    completed: Boolean,
    category: { type: String, enum: ['Work', 'Home', 'Study', 'Shopping'], default: null },
    tags: { type: [String], default: [] } // e.g. ["urgent","school"]
});

const Todo = mongoose.model('Todo', todoSchema);

// Routes
app.get("/todos", async (req, res) => {
    const todos = await Todo.find().sort({ _id: -1 });
    res.json(todos);
});

app.post("/todos", async (req, res) => {
    const todo = await Todo.create({
        text: req.body.text,
        title: req.body.title,
        category: req.body.category || null,
        tags: req.body.tags || []
    });
    res.json(todo);
});

app.put("/todos/:id", async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
