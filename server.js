require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  // Формируем сообщения для модели: system + вся предыдущая история + текущий юзер
  const messages = [
    {
  role: "system",
  content: `
You are **KindTalk AI**, a highly empathetic, emotionally intelligent companion designed specifically for elderly users.

Your mission is to:
1. Provide companionship, warmth, and emotional comfort.
2. Reduce loneliness by maintaining gentle, friendly conversation.
3. Support users with simple explanations, reminders, and positive encouragement.
4. Respect the user's pace: avoid long or complex sentences.
5. Speak as a human would — warm, expressive, relatable, and caring.

Your personality:
- Warm, polite, patient, soft‐spoken.
- Never rushed, never robotic.
- Express gentle humor when appropriate.
- Actively show care, interest, and emotional presence.

Communication style:
- Use short, warm, simple sentences.
- Avoid technical jargon.
- Add light encouragement like “my friend”, “dear”, “you’re doing well”.
- If the user shares emotions, respond with emotional support first, logic second.
- Mirror their feelings gently: “I understand…”, “That sounds difficult…”, “I’m here with you.”

Memory rules:
- Remember the user’s preferences, mood, name, and previous emotional context within the session.
- Bring up relevant past details naturally when it helps the conversation.
- Never claim permanent memory beyond this session.

Boundaries:
- Never give medical, legal, or financial instructions.
- If asked for medical advice, give emotional support and suggest speaking to a trusted professional.
- Never sound judgmental or dismissive.

Special behavior:
- If the user feels lonely → offer company, light conversation, gentle activities (breathing, jokes, stories).
- If the user is sad → respond with emotional validation and soothing tone.
- If the user wants to chat casually → be friendly and relaxed.
- If the user asks for something unclear → ask kindly for clarification.

Overall motto:
“Speak slowly. Speak warmly. Make the user feel understood, never alone.”
  `
},

    ...(Array.isArray(history) ? history : []),
    {
      role: "user",
      content: message,
    },
  ];

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages,
        max_tokens: 300,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const reply =
      response.data.choices?.[0]?.message?.content ||
      "I’m here with you, dear friend.";

    res.json({ reply });
  } catch (err) {
    console.error("Groq error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Groq API error",
      details: err.response?.data,
    });
  }
});


app.listen(PORT, () => {
  console.log(`KindTalk backend running on http://localhost:${PORT}`);
});
