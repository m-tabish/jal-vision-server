const express = require("express");
const router = express.Router();
const verifyRole = require("../middlewares/roleMiddleware");

router.get("/dashboard", verifyRole("STATE"), (req, res) => {
    res.json({ message: "Welcome to State Dashboard" });
});

module.exports = router;
