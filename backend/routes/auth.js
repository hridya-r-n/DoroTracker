const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");  

// ===== REGISTER =====
router.post("/register", async (req, res) => {
  const db = req.app.get("db");
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into DB
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ error: "Email already exists" });
          }
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: "User registered successfully" });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== LOGIN =====
router.post("/login", async (req, res) => {
  const db = req.app.get("db");
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
          return res.status(400).json({ error: "User not found" });
        }

        const user = results[0];

        // Compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return res.status(400).json({ error: "Invalid password" });
        }

        // Successful login
        res.json({
          message: "Login successful",
          user: { id: user.id, name: user.name, email: user.email },
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
