const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express(); // Certifique-se de que o Express está sendo inicializado
app.use(express.json()); // Processar JSON no corpo da requisição

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database("./faq.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
  }
});

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "public")));

// Rota principal para exibir o HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rota POST para o chatbot
app.post("/chatbot", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Por favor, envie uma mensagem." });
  }

  const userQuestion = message.toLowerCase();
  console.log("Pergunta recebida:", userQuestion);

  db.get(
    "SELECT answer FROM faq WHERE question = ? COLLATE NOCASE",
    [userQuestion],
    (err, row) => {
      if (err) {
        console.error("Erro ao acessar o banco de dados:", err.message);
        return res.status(500).json({ reply: "Erro interno do servidor." });
      }

      if (row) {
        res.json({ reply: row.answer });
      } else {
        res.json({ reply: "Desculpe, não entendi sua pergunta. Tente algo diferente." });
      }
    }
  );
});

// Inicializa o servidor na porta 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
