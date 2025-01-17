const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para ler dados no formato JSON
app.use(express.json());

// Rota GET
app.get('/api/data', (req, res) => {
  res.json({ message: "Dados retornados com sucesso!" });
});

// Rota POST
app.post('/api/data', (req, res) => {
  const data = req.body;
  res.json({ message: "Recebido com sucesso", data });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
