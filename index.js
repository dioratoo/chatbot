const express = require('express');
const app = express();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'chatbot.db'
});
const Chat = require('./models/chat'); // Importa o modelo de Chat

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());

// Sincroniza o banco de dados
sequelize.sync()
  .then(() => console.log('Banco de dados sincronizado com sucesso!'))
  .catch(err => console.log('Erro ao sincronizar o banco de dados:', err));

// Rota para a raiz
app.get('/', (req, res) => {
  res.send('Servidor rodando corretamente!');
});

// Rota para obter as perguntas e respostas
app.get('/api/chat', async (req, res) => {
  try {
    const chats = await Chat.findAll(); // Busca todas as perguntas e respostas
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar chats' });
  }
});

// Rota para adicionar uma nova pergunta e resposta
app.post('/api/chat', async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newChat = await Chat.create({ question, answer });
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar nova pergunta/resposta' });
  }
});

// Rota para responder a perguntas
app.post('/api/respond', async (req, res) => {
  const { question } = req.body;

  try {
    const chat = await Chat.findOne({
      where: { question }
    });

    if (!chat) {
      return res.status(404).json({ message: 'Pergunta não encontrada no banco de dados' });
    }

    res.json({ answer: chat.answer });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar resposta' });
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
