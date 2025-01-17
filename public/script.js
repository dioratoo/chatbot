document.getElementById('send-btn').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
      fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userInput })
      })
        .then(res => res.json())
        .then(data => {
          const messages = document.getElementById('messages');
          messages.innerHTML += `<div><strong>Você:</strong> ${data.question}</div>`;
          messages.innerHTML += `<div><strong>Chatbot:</strong> ${data.answer}</div>`;
          document.getElementById('user-input').value = '';
          messages.scrollTop = messages.scrollHeight;
        });
    }
  });
  
  document.getElementById('add-btn').addEventListener('click', () => {
    const question = document.getElementById('new-question').value;
    const answer = document.getElementById('new-answer').value;
    if (question && answer) {
      fetch('/add-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer })
      })
        .then(res => res.json())
        .then(data => {
          alert(data.message);
          document.getElementById('new-question').value = '';
          document.getElementById('new-answer').value = '';
        });
    }
  });
  