const express = require('express');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = new Database('my-database.db');

// Criando a tabela de respostas se não existir
db.prepare(`
  CREATE TABLE IF NOT EXISTS responses (
    question TEXT PRIMARY KEY,
    answer TEXT
  )
`).run();

// Função para buscar respostas no banco de dados
function getChatbotResponse(question) {
  const stmt = db.prepare('SELECT answer FROM responses WHERE question = ?');
  const row = stmt.get(question.toLowerCase());
  return row ? row.answer : 'Desculpe, não entendi a sua pergunta.';
}

// Adicionar uma pergunta e resposta ao banco de dados
function addQuestionAndAnswer(question, answer) {
  const stmt = db.prepare('INSERT OR REPLACE INTO responses (question, answer) VALUES (?, ?)');
  stmt.run(question.toLowerCase(), answer);
}

// Rota para obter resposta do chatbot
app.post('/chat', (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'A pergunta é obrigatória' });
  }
  const answer = getChatbotResponse(question);
  res.json({ question, answer });
});

// Rota para adicionar perguntas e respostas
app.post('/add-question', (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: 'A pergunta e a resposta são obrigatórias' });
  }
  addQuestionAndAnswer(question, answer);
  res.json({ message: 'Pergunta e resposta adicionadas com sucesso!' });
});

// Inicializando o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

process.on('exit', () => {
  db.close();
});
