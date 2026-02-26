const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 3000;

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔹 Serve HTML from public folder
app.use(express.static("html"));
// 🔹 MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "student_db"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

const path = require("path");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "registration.html"));
});

// POST Route (Backend Logic)
app.post("/register", (req, res) => {
    const { name, roll, gender, course, hobbies, address } = req.body;

    if (!name || !roll || !gender || !hobbies || !address) {
        return res.status(400).send("❌ Registration Failed! Fill all required fields.");
    }

    // Convert hobbies array to string if needed
    const hobbiesStr = Array.isArray(hobbies) ? hobbies.join(", ") : hobbies;

    const sql = `
        INSERT INTO students (name, roll, gender, course, hobbies, address)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [name, roll, gender, course, hobbiesStr, address], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        res.send("✔ Registration Completed & Saved to Database!");
    });
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});