const express = require("express");
const router = express.Router();
const verifyRole = require("../middlewares/roleMiddleware");

router.get("/dashboard", verifyRole("DISTRICT"), (req, res) => {
    res.json({ message: "Welcome to District Dashboard" });
});

module.exports = router;
