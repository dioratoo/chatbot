const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("faq.db");

db.serialize(() => {
  // Criação da tabela FAQ
  db.run(`
    CREATE TABLE IF NOT EXISTS faq (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      answer TEXT NOT NULL
    )
  `);

  console.log("Tabela FAQ criada com sucesso!");

  // Inserir perguntas e respostas iniciais
  const stmt = db.prepare("INSERT INTO faq (question, answer) VALUES (?, ?)");
  stmt.run("oi", "Olá! Como posso ajudar?");
  stmt.run("qual é o seu nome?", "Eu sou um chatbot criado para te ajudar!");
  stmt.run("como funciona o sistema Protheus?", "O sistema Protheus é uma solução ERP para gestão empresarial.");
  stmt.run("qual é o seu propósito?", "Meu propósito é ajudar com dúvidas relacionadas ao GLPI e Protheus.");
  stmt.run("adeus", "Até mais! Volte sempre.");
  stmt.finalize();

  console.log("Dados iniciais inseridos com sucesso!");
});

db.close();
