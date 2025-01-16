const express = require("express");
const path = require("path");

const app = express();
app.use(express.json()); // Processar JSON no corpo da requisição

// Banco de perguntas e respostas
const faq = {
  "oi": "Olá! Como posso ajudar?",
  "qual é o seu nome?": "Eu sou um chatbot criado para te ajudar!",
  "como faço para criar um chatbot?": "Você pode usar Node.js, Express e um serviço como Render para começar.",
  "adeus": "Até mais! Volte sempre."
};

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "public")));

// Rota principal para exibir o HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rota POST para o chatbot
app.post("/chatbot", (req, res) => {
  const { message } = req.body; // Extrai a mensagem do corpo da requisição
  if (!message) {
    return res.status(400).json({ error: "Por favor, envie uma mensagem." });
  }

  // Responder dinamicamente
  const response = faq[message.toLowerCase()] || "Desculpe, não entendi sua pergunta.";
  res.json({ reply: response });
});

// Inicializa o servidor na porta 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
