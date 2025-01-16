const express = require("express");
const path = require("path");

const app = express();
app.use(express.json()); // Processar JSON no corpo da requisição

// Banco de perguntas e respostas diretamente no código
const faq = {
  "hola": "¡Hola! ¿En qué puedo ayudarte?",
  "¿cómo estás?": "¡Estoy bien, gracias por preguntar! ¿Y tú?",
  "¿qué es protheus?": "Protheus es un sistema ERP desarrollado por TOTVS para gestionar empresas.",
  "adiós": "¡Hasta luego! ¡Vuelve pronto!"
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
    return res.status(400).json({ error: "Por favor, envíe un mensaje." });
  }

  // Responder dinamicamente
  const response = faq[message.toLowerCase()] || "Lo siento, no entendí tu pregunta. Intenta algo diferente.";
  res.json({ reply: response });
});

// Inicializa o servidor na porta 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
