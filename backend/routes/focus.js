const express = require("express");
const router = express.Router();

router.use(express.json());

// Record focus session
router.post("/", (req, res) => {
  const db = req.app.get("db");
  const { user_id, focus_time } = req.body;

  if (!user_id) return res.status(400).json({ error: "User ID required" });
  if (!focus_time) return res.status(400).json({ error: "Focus time required" });

  const query = "INSERT INTO focus_log (user_id, focus_time, date) VALUES (?, ?, ?)";
    const now = new Date(); // JS date object, uses local time
    db.query(query, [user_id, focus_time, now], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Focus session saved" });
    });

});

// Get history of a user
router.get("/:user_id", (req, res) => {
  const db = req.app.get("db");
  const { user_id } = req.params;

  const query = "SELECT * FROM focus_log WHERE user_id = ? ORDER BY date DESC";
  db.query(query, [user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(result);
  });
});

module.exports = router;
