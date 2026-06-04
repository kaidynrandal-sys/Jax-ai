import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const text = req.body.message;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are Jax, a funny sarcastic lion AI. Keep replies short and natural."
        },
        {
          role: "user",
          content: text
        }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (err) {
    res.json({ reply: "Jax is confused right now 🦁" });
  }
});

app.listen(3000, () => {
  console.log("Jax backend running 🦁");
});
