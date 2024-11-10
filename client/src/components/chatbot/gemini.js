import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI("AIzaSyBZsrynO8TffN_dCZEom2tXChJljppX9wM");
console.log(process.env.REACT_APP_GEMINI_API_KEY);
// Chat history to maintain context, with personalized advice
const INITIAL_CHAT_CONTEXT = [
  {
    role: "user",
    parts: `You are a helpful AI assistant for Pocketly, a personal finance management app. 
    Key features include expense tracking, budget planning, financial reports, and bill reminders. 
    Respond in a friendly, professional manner and keep responses concise.`,
  },
  {
    role: "model",
    parts:
      "Understood. I am ready to help users with their Pocketly-related questions.",
  },
  {
    role: "user",
    parts:
      "I want insights into my spending habits and how I can optimize my budget.",
  },
  {
    role: "model",
    parts:
      "Sure! Please provide me with your transaction data or monthly budget breakdown.",
  },
];

let chatInstance = null;

export const generateResponse = async (message, userData) => {
  try {
    if (!process.env.REACT_APP_GEMINI_API_KEY) {
      throw new Error("Gemini API key not configured");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    if (!chatInstance) {
      chatInstance = model.startChat({
        history: INITIAL_CHAT_CONTEXT,
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.7,
        },
      });
    }

    // Pre-process the user data to identify trends and insights
    const financialInsights = analyzeSpending(userData);

    // Generate a response based on financial insights
    const responseMessage = `
      Here are some insights based on your recent financial data:

      - **Total Spending**: $${financialInsights.totalSpending}
      - **Biggest Expense Categories**: ${financialInsights.topCategories.join(
        ", "
      )}
      - **Budget Overages**: You are overspending in the category of ${
        financialInsights.overspentCategory
      }.
      - **Recommendations**: Consider reducing your spending in ${
        financialInsights.overspentCategory
      } and redistributing that amount to ${
      financialInsights.recommendedCategory
    }.
    `;

    // Return the response message to be handled by the component
    return responseMessage;
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw error;
  }
};

// A function to analyze user spending habits and generate insights
const analyzeSpending = (userData) => {
  const categories = {
    food: 0,
    billing: 0,
    taxation: 0,
    medical: 0,
    salary: 0,
    tips: 0,
    project: 0,
    fees: 0,
    movies: 0,
    books: 0,
  };

  userData.transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      switch (transaction.category.toLowerCase()) {
        case "food":
          categories.food += transaction.amount;
          break;
        case "billing":
          categories.billing += transaction.amount;
          break;
        case "taxation":
          categories.taxation += transaction.amount;
          break;
        case "medical":
          categories.medical += transaction.amount;
          break;
        case "salary":
          categories.salary += transaction.amount;
          break;
        case "tips":
          categories.tips += transaction.amount;
          break;
        case "project":
          categories.project += transaction.amount;
          break;
        case "fees":
          categories.fees += transaction.amount;
          break;
        case "movies":
          categories.movies += transaction.amount;
          break;
        case "books":
          categories.books += transaction.amount;
          break;
        default:
          break;
      }
    }
  });

  const totalSpending = Object.values(categories).reduce(
    (acc, categoryAmount) => acc + categoryAmount,
    0
  );

  const topCategories = Object.entries(categories)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([category]) => category);

  const overspentCategory = topCategories[0];
  const recommendedCategory = topCategories[1] || "entertainment";

  return {
    totalSpending,
    topCategories,
    overspentCategory,
    recommendedCategory,
  };
};
