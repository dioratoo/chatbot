const express = require("express");
const app = express();
const port = process.env.PORT || 5000; // Usando a porta 5000 ou a porta configurada no Heroku

// Middleware para poder ler JSON no corpo das requisições
app.use(express.json());

// Rota GET para verificar se o servidor está funcionando
app.get("/", (req, res) => {
  res.send("Servidor funcionando corretamente!");
});

// Rota POST para o chatbot
app.post("/chatbot", (req, res) => {
  const { message } = req.body;  // Recebe a mensagem enviada pelo cliente
  console.log("Mensagem recebida:", message);  // Log da mensagem para depuração

  let response;

  // Respostas simples baseadas no conteúdo da mensagem
  if (message && message.toLowerCase().includes("oi")) {
    response = "Olá! Como posso ajudar você?";
  } else if (message && message.toLowerCase().includes("tchau")) {
    response = "Até logo! Foi um prazer falar com você.";
  } else {
    response = "Desculpe, não entendi sua mensagem.";
  }

  res.json({ response }); // Envia a resposta de volta para o cliente
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
