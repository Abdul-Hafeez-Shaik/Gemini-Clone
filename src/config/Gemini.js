// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node
// REDACTED_API_KEY

// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

async function runChat(prompt) {
  const ai = new GoogleGenAI({
    // apiKey: process.env.GEMINI_API_KEY,
    apiKey: "REDACTED_API_KEY"
  });
  const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `${prompt}`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fullText = '';
  for await (const chunk of response) {
    if (chunk.text) {
      fullText += chunk.text;
    }
  }
  return fullText;
}

export default runChat;