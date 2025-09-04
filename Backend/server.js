const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/schoolimages", express.static("schoolimages")); // serve uploaded images

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // replace with your MySQL username
  password: "Suvarna22neelam@", // replace with your MySQL password
  database: "schooldb"
});

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "schoolimages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// API: Add School
app.post("/addSchool", upload.single("image"), (req, res) => {
      console.log("BODY:", req.body);
  console.log("FILE:", req.file);
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, address, city, state, contact, email_id, image], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "School added successfully!" });
  });
});

// API: Get Schools
app.get("/schools", (req, res) => {
  db.query("SELECT * FROM schools", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});
// API: Delete School by ID
app.delete("/school/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM schools WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "School deleted successfully!" });
  });
});


app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
