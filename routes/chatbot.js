// backend/routes/chatbot.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    // Replace 'YOUR_GEMINI_API_ENDPOINT' and 'YOUR_API_KEY' with actual values
    const response = await axios.post(
      "YOUR_GEMINI_API_ENDPOINT",
      {
        message: message,
      },
      {
        headers: {
          Authorization: `Bearer YOUR_API_KEY`,
        },
      }
    );

    res.json({ reply: response.data.reply });
  } catch (error) {
    console.error("Error communicating with Gemini AI:", error);
    res.status(500).json({ error: "Failed to communicate with AI" });
  }
});

module.exports = router;
