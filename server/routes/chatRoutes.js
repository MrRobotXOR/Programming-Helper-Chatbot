const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createChat,
  sendMessage,
  getChats,
  deleteChat,
} = require("../controllers/chatController");

router.post("/new", authMiddleware, createChat);

router.post("/message", authMiddleware, sendMessage);

router.get("/history", authMiddleware, getChats);

router.delete("/:id", authMiddleware, deleteChat);

module.exports = router;