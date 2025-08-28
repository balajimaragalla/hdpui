import React, { useState } from 'react';

interface Message {
  from: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input) return;
    setMessages([...messages, { from: 'user', text: input }, { from: 'bot', text: 'This is a placeholder response.' }]);
    setInput('');
  };

  return (
    <div>
      <h2>Chatbot</h2>
      <div>
        {messages.map((m, i) => (
          <p key={i}><strong>{m.from}:</strong> {m.text}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage} className="primary">Send</button>
    </div>
  );
};

export default Chatbot;
