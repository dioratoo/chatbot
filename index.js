const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public"))); // Para processar JSON no body


// Base de perguntas e respostas
const faq = {
  "oi": "Olá! Como posso ajudar?",
  "qual é o seu nome?": "Eu sou um chatbot criado para te ajudar!",
  "como faço para criar um chatbot?": "Você pode usar Node.js, Express e um serviço como Render para começar.",
  "adeus": "Até mais! Volte sempre."
};

// Rota principal para testes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rota do chatbot
app.post("/chatbot", (req, res) => {
  const { message } = req.body; // Extrai a mensagem do body da requisição
  if (!message) {
    return res.status(400).json({ error: "Por favor, envie uma mensagem." });
  }

  // Responder dinamicamente
  const response = faq[message.toLowerCase()] || "Desculpe, não entendi sua pergunta.";
  res.json({ reply: response });
});

// Servidor rodando
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
