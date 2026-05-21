const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateEmail({
  recipientName,
  purpose,
  tone,
  notes,
}) {

  try {

    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a professional email writer.",
          },
          {
            role: "user",
            content: `
Generate a professional email.

Recipient: ${recipientName}
Purpose: ${purpose}
Tone: ${tone}
Notes: ${notes || ""}
`,
          },
        ],

        model: "llama-3.1-8b-instant",
      });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

module.exports = { generateEmail };