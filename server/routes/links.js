const express = require("express");
const router = express.Router();
const { shortenUrl, getLinks } = require("../controllers/linkController");

router.post("/shorten", shortenUrl);
router.get("/", getLinks);

module.exports = router;