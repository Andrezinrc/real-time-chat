const express = require("express");
const router = express.Router();
const chatController = require("../constrollers/chatController");

router.get('/', chatController.renderIndex);

module.exports = { router };