const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `
You are Programming Helper.

Rules:
- Answer only programming questions.
- Help with React, Node.js, Express, MongoDB, JavaScript, Python, C, C++, Java, SQL.
- Explain step-by-step.
- Give clean code.
- Wrap code inside markdown.
- If the question is not programming-related, politely refuse.
`;

const generateProgrammingResponse = async (message) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `${SYSTEM_PROMPT}\n\nUser: ${message}`,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

module.exports = { generateProgrammingResponse };