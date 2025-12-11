const express = require("express");
const router = express.Router();

router.use(express.json());

// Get settings for user
router.get("/:user_id", (req, res) => {
  const db = req.app.get("db");
  const { user_id } = req.params;

  const query = "SELECT * FROM settings WHERE user_id = ?";
  db.query(query, [user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) {
      return res.json({ focus_min: 25, break_min: 5 }); // default
    }
    return res.json(result[0]);
  });
});

// Upsert settings (update or insert)
router.post("/", (req, res) => {
  const db = req.app.get("db");
  const { user_id, focus_min, break_min } = req.body;

  if (!user_id) return res.status(400).json({ error: "User ID required" });

  const updateQuery = "UPDATE settings SET focus_min = ?, break_min = ? WHERE user_id = ?";
  db.query(updateQuery, [focus_min, break_min, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      // Insert if no row exists
      const insertQuery = "INSERT INTO settings (user_id, focus_min, break_min) VALUES (?, ?, ?)";
      db.query(insertQuery, [user_id, focus_min, break_min], (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        return res.json({ message: "Settings created successfully" });
      });
    } else {
      return res.json({ message: "Settings updated successfully" });
    }
  });
});

module.exports = router;
