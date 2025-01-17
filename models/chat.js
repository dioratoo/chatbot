// models/chat.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'chatbot.db' // Arquivo do banco de dados SQLite
});

// Definição do modelo Chat
const Chat = sequelize.define('Chat', {
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Chat;
