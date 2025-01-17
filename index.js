const express = require('express');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');

// Criando uma instância do servidor Express
const app = express();

// Configurando o body-parser para lidar com JSON
app.use(bodyParser.json());

// Criando a conexão com o banco de dados SQLite
const db = new Database('my-database.db');

// Criando a tabela de respostas do chatbot se ela não existir
db.prepare(`
  CREATE TABLE IF NOT EXISTS responses (
    question TEXT PRIMARY KEY,
    answer TEXT
  )
`).run();

// Função para obter a resposta do chatbot no banco de dados
function getChatbotResponse(question) {
  const stmt = db.prepare('SELECT answer FROM responses WHERE question = ?');
  const row = stmt.get(question);

  if (row) {
    return row.answer;
  } else {
    return 'Desculpe, não entendi a sua pergunta.';
  }
}

// Função para adicionar uma pergunta e resposta no banco de dados
function addQuestionAndAnswer(question, answer) {
  const stmt = db.prepare('INSERT OR REPLACE INTO responses (question, answer) VALUES (?, ?)');
  stmt.run(question, answer);
}

// Definindo uma rota para enviar perguntas para o chatbot (requisição POST)
app.post('/chat', (req, res) => {
  const { question } = req.body;

  // Verificando se a pergunta foi enviada no corpo da requisição
  if (!question) {
    return res.status(400).json({ error: 'A pergunta é obrigatória' });
  }

  const answer = getChatbotResponse(question);

  // Respondendo com a resposta do chatbot
  res.json({ question, answer });
});

// Definindo uma rota para adicionar perguntas e respostas (requisição POST)
app.post('/add-question', (req, res) => {
  const { question, answer } = req.body;

  // Verificando se a pergunta e a resposta foram enviadas
  if (!question || !answer) {
    return res.status(400).json({ error: 'A pergunta e a resposta são obrigatórias' });
  }

  // Adicionando a pergunta e resposta ao banco de dados
  addQuestionAndAnswer(question, answer);

  // Respondendo que a pergunta foi adicionada com sucesso
  res.json({ message: 'Pergunta e resposta adicionadas com sucesso!' });
});

// Inicializando o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

// Fechando a conexão com o banco de dados quando o processo for finalizado
process.on('exit', () => {
  db.close();
});
