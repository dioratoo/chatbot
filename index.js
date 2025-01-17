const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());

app.post('/api/data', (req, res) => {
  try {
    const data = req.body; // Acessa os dados no corpo da requisição
    res.json({ message: 'Recebi seus dados!', data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao processar o JSON' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
