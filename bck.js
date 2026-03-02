const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve HTML from "html" folder
app.use(express.static("html"));

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",         
    password: "root",      
    database: "student_db" 
});

db.connect((err) => {
    if (err) console.error("❌ Database connection failed:", err);
    else console.log("✅ Connected to MySQL database");
});

// Handle form submissions
app.post("/register", (req, res) => {
    const { name, roll, gender, course, hobbies, address } = req.body;

    // Backend validation
    if (!name || !roll || !gender || !hobbies || !address) {
        return res.status(400).send("❌ Registration Failed! Fill all required fields.");
    }

    // Convert hobbies array to string if needed
    const hobbiesStr = Array.isArray(hobbies) && hobbies.length ? hobbies.join(", ") : "None";

    // SQL query
    const sql = `
        INSERT INTO students (name, roll, gender, course, hobbies, address)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [name, roll, gender, course, hobbiesStr, address], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("❌ Database error");
        }
        res.redirect("/success.html");
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});