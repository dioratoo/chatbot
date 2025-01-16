const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json()); // Processar JSON no corpo da requisição

// Carregar perguntas e respostas do JSON
let faq;
try {
  const data = fs.readFileSync(path.join(__dirname, "faq.json"), "utf8");
  faq = JSON.parse(data);
  console.log("Arquivo FAQ carregado com sucesso!");
} catch (error) {
  console.error("Erro ao carregar o arquivo FAQ:", error.message);
  faq = {};
}

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "public")));

// Rota principal para exibir o HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rota POST para o chatbot
app.post("/chatbot", (req, res) => {
  const { message } = req.body;
  console.log("Mensagem recebida:", message); // Log da mensagem recebida
  const response = faq[message.toLowerCase()] || "Lo siento, no entendí tu pregunta. Intenta algo diferente.";
  console.log("Resposta enviada:", response); // Log da resposta enviada
  res.json({ reply: response });
});


// Inicializa o servidor na porta 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
