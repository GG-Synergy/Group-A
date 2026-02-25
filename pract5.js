const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔹 Serve HTML from public folder
app.use(express.static("html"));

const path = require("path");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "registration.html"));
});

// POST Route (Backend Logic)
app.post("/register", (req, res) => {

    const { name, roll, gender, course, hobbies, address } = req.body;

    // Backend validation
    if (!name || !roll || !gender || !hobbies || !address) {
        return res.status(400).send("❌ Registration Failed! Fill all required fields.");
    }

    // If everything is correct
    console.log("Student Data Received:");
    console.log(req.body);

    res.send("✔ Registration Completed Successfully!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});