const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Connection Error:", err));

// Schema & Model
const User = mongoose.model('User', { name: String, email: String });


//

app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});



// API Route
app.post('/api/save', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json({ message: "Data Saved!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save" });
  }
});

// Important for Vercel
module.exports = app;

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));