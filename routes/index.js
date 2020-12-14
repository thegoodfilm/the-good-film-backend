const express = require("express");

const router = express.Router();

// GET HOME
router.get("/", (req, res, next) => {
  res.send("Home");
});

module.exports = router;
