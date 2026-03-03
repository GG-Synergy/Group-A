const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Default route FIRST

// Then static middleware
// FIX: serve public/ not __dirname (which exposed bck.js source to the web)
app.use(express.static(path.join(__dirname, "public")));

// Serve CSS folder
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

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
// Login route — validates roll exists in DB then redirects to home
app.post("/login", (req, res) => {
    const { roll, password } = req.body;
    if (!roll || !password) {
        return res.status(400).send("Please fill all fields.");
    }
    // Look up student by roll number
    db.query("SELECT * FROM students WHERE roll_no = ?", [roll], (err, results) => {
        if (err) return res.status(500).send("Database error");
        if (results.length === 0) {
            return res.status(401).send("Invalid Roll No or Password.");
        }
        res.redirect("/home.html");
    });
});

app.post("/register", (req, res) => {

    console.log("BODY DATA:", req.body);

    // FIX: form sends day/month/year separately — was wrongly reading "dateofbirth"
    const { name, roll, day, month, year, gender, course, hobbies, address } = req.body;

    // Backend validation
    if (!name || !roll || !day || !month || !year || !gender || !address) {
        return res.status(400).send("Registration Failed! Fill all required fields.");
    }

    // FIX: validate DOB dropdowns not left on placeholder value "-1"
    if (day === "-1" || month === "-1" || year === "-1") {
        return res.status(400).send("Registration Failed! Select a complete date of birth.");
    }

     // ✅ Assemble dateofbirth in correct MySQL format (YYYY-MM-DD)
    const dateofbirth = `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`;


    // Convert hobbies array to string if needed
    const hobbiesStr = Array.isArray(hobbies) && hobbies.length ? hobbies.join(", ") : "None";

    // SQL query
    const sql = `
        INSERT INTO students (name, roll_no, date_of_birth, gender, course, hobbies, address)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [name, roll, dateofbirth, gender, course, hobbiesStr, address], (err, result) => {
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