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
  stmt.run("hola", "¡Hola! ¿Cómo puedo ayudarte?");
  stmt.run("¿cómo funciona el sistema Protheus?", "El sistema Protheus es una solución ERP para la gestión empresarial.");
  stmt.run("como funciona o sistema Protheus?", "O sistema Protheus é uma solução ERP para gestão empresarial.");
  stmt.run("qual é o seu propósito?", "Meu propósito é ajudar com dúvidas relacionadas ao GLPI e Protheus.");
  stmt.run("adeus", "Até mais! Volte sempre.");
  stmt.finalize();

  console.log("Dados iniciais inseridos com sucesso!");
});

db.close();
