import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  initialMessages: [
    createChatBotMessage(
      "Hi! I'm your AI-powered Pocketly assistant. How can I help you today?",
      {
        delay: 500,
      }
    ),
  ],
  botName: "Pocketly AI",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#4F46E5", // Blue color for bot's message box
    },
    chatButton: {
      backgroundColor: "#4F46E5", // Same blue for the chat button
    },
  },
  state: {
    context: [],
  },
};

export default config;
