const Chat = require("../models/Chat");
const { generateProgrammingResponse } = require("../services/aiService");

const createChat = async (req, res) => {
  try {
    const chat = await Chat.create({
      userId: req.user.id,
      title: "New Chat",
      messages: [],
    });

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { chatId, message } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    // User Message
    chat.messages.push({
      role: "user",
      content: message,
    });

    // Agar ye pehla user message hai to title bana do
    if (
      chat.title === "New Chat" &&
      chat.messages.filter((m) => m.role === "user").length === 1
    ) {
      chat.title = message.split(" ").slice(0, 6).join(" ");
    }

    // AI Response
    let aiReply;

    try {
      aiReply = await generateProgrammingResponse(message);
    } catch (error) {
      console.error("Gemini Error:", error.message);

      aiReply = `## Programming Helper (Offline Mode)

Your question: **${message}**

Gemini API is not configured correctly, so I'm using offline mode.

Example answer:
- Break the problem into steps.
- Write clean code.
- Test your solution.
- Use debugging tools like console.log() or Postman.`;
    }

    // Assistant Message
    chat.messages.push({
      role: "assistant",
      content: aiReply,
    });

    await chat.save();

    res.json({
      success: true,
      messages: chat.messages,
    });
  } catch (error) {
    console.error("CHAT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.id }).sort({
      updatedAt: -1,
    });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Chat
const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    res.json({
      success: true,
      message: "Chat deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createChat,
  sendMessage,
  getChats,
  deleteChat,
};