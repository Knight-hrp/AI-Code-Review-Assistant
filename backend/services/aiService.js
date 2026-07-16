const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function reviewCode(code, language) {
    const prompt = `
You are a senior software engineer.

Review this ${language} code.

Return:
1. Bugs
2. Security Issues
3. Code Smells
4. Performance
5. Best Practices
6. Refactored Code
7. Score out of 100

Code:
${code}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return response.text;
}

module.exports = {
    reviewCode,
};