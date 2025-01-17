const express = require('express'); // Importa o framework Express
const app = express(); // Inicializa o aplicativo Express
const PORT = 3000; // Define a porta onde o servidor irá rodar

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Middleware para servir arquivos estáticos (opcional)
app.use(express.static('public'));

// Endpoint GET
app.get('/api/data', (req, res) => {
  res.json({ message: 'Esta é uma resposta JSON para o GET' });
});

// Endpoint POST
app.post('/api/data', (req, res) => {
  const data = req.body; // Obtém os dados enviados no corpo da requisição
  res.json({ message: 'Recebi seus dados!', data });
});

// Tratamento de rota não encontrada
app.use((req, res, next) => {
  res.status(404).send('Rota não encontrada!');
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
