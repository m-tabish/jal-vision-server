const express = require("express");
const router = express.Router();
const verifyRole = require("../middlewares/roleMiddleware");

router.get("/dashboard", verifyRole("ADMIN"), (req, res) => {
    res.json({ message: "Welcome to Admin Dashboard" });
});

module.exports = router;
