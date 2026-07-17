const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function reviewCode(code, language) {
    const prompt = `
You are a senior software engineer and a code reviewer.

Review this ${language} code for bugs, security vulnerabilities, performance issues, code smells, and best practices.

Provide a quality score out of 100, a summary, a list of critical bugs, and detailed suggestions.
For each suggestion, specify the type (e.g. Bug, Security, Style, Performance, Best Practice), severity (High, Medium, Low), a descriptive message, the recommended fix/suggestion, and the line number where the issue occurs.

Code:
${code}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    score: { type: "INTEGER" },
                    summary: { type: "STRING" },
                    bugs: {
                        type: "ARRAY",
                        items: { type: "STRING" }
                    },
                    suggestions: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                id: { type: "INTEGER" },
                                type: { type: "STRING" },
                                severity: { type: "STRING" },
                                message: { type: "STRING" },
                                suggestion: { type: "STRING" },
                                line: { type: "INTEGER" }
                            },
                            required: ["id", "type", "severity", "message", "suggestion", "line"]
                        }
                    }
                },
                required: ["score", "summary", "bugs", "suggestions"]
            }
        }
    });

    return response.text;
}

module.exports = {
    reviewCode,
};