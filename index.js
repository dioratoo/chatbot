const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const translate = require("google-translate-api");

const app = express();
app.use(express.json());

// Conectar ao banco de dados
const db = new sqlite3.Database("faq.db");

// Rota POST para o chatbot
app.post("/chatbot", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Por favor, envie uma mensagem." });
  }

  try {
    // Detectar o idioma da mensagem
    const detection = await translate(message, { to: "en" });
    const detectedLanguage = detection.from.language.iso;

    // Traduzir a mensagem para português (idioma padrão do banco)
    const translatedMessage = detection.text;

    // Consultar a resposta no banco de dados
    db.get(
      "SELECT answer FROM faq WHERE question = ?",
      [translatedMessage.toLowerCase()],
      async (err, row) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro no servidor." });
        }

        if (row) {
          // Traduzir a resposta de volta para o idioma do usuário
          const translatedAnswer = await translate(row.answer, { to: detectedLanguage });
          res.json({ reply: translatedAnswer.text });
        } else {
          res.json({ reply: "Lo siento, no entendí tu pregunta." });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao processar a tradução." });
  }
});

// Inicializa o servidor na porta 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
