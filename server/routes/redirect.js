const express = require("express");
const router = express.Router();
const { redirectUrl } = require("../controllers/linkController");

router.get("/:code", redirectUrl);

module.exports = router;