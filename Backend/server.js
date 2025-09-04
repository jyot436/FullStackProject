require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/schoolimages", express.static("schoolimages")); // serve uploaded images

// MySQL connection using env variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "schoolimages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Add School API
app.post("/addSchool", upload.single("image"), (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = "INSERT INTO schools(name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, address, city, state, contact, email_id, image], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "School added successfully!" });
  });
});

// Get Schools API
app.get("/schools", (req, res) => {
  db.query("SELECT * FROM schools", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Delete School API
app.delete("/school/:id", (req, res) => {
  const { id } = req.params;
  // Change table name to 'schooldb' here
  const sql = "DELETE FROM schools WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "School deleted successfully!" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
