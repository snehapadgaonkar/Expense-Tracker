const axios = require("axios");

// Function to handle chatbot logic
const handleChatbot = async (req, res) => {
  try {
    const { message, userid } = req.body;

    if (!message || !userid) {
      return res.status(400).json({ error: "Message and userId are required" });
    }

    // Send message to OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // Or GPT-4 if needed
        messages: [{ role: "user", content: message }],
        max_tokens: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use your API key
        },
      }
    );

    const botReply = response.data.choices[0].message.content;

    // Send the chatbot reply to the user
    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get a response from GPT" });
  }
};

// Function to handle different types of responses based on user needs
const handleAnalysis = async (req, res) => {
  try {
    const { type, data, userid } = req.body;

    if (!type || !data || !userid) {
      return res
        .status(400)
        .json({ error: "Type, data, and userId are required" });
    }

    let prompt = "";
    if (type === "transaction") {
      // For example, if type is "transaction", generate financial analysis prompt
      prompt = `Can you analyze these financial transactions? ${data}`;
    } else if (type === "general") {
      // Handle other types of analysis if needed
      prompt = `Can you give me an analysis about this data? ${data}`;
    }

    // Send analysis prompt to OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // Or GPT-4 if needed
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const botReply = response.data.choices[0].message.content;

    // Return the analysis response
    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to generate analysis" });
  }
};

module.exports = {
  handleChatbot,
  handleAnalysis,
};
