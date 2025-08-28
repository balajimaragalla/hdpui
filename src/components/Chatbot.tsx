import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { sendMessage } from '../services/chatApi';

const Wrapper = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? '0' : '-320px')};
  width: 320px;
  height: 100%;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: -2px 0 5px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  transition: right 0.3s;
  z-index: 1000;
`;

const Messages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
`;

const Bubble = styled.div<{ from: 'user' | 'bot' }>`
  background: ${({ from, theme }) => (from === 'user' ? theme.colors.accent : '#eee')};
  color: ${({ from, theme }) => (from === 'user' ? theme.colors.white : theme.colors.text)};
  padding: 0.5rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  align-self: ${({ from }) => (from === 'user' ? 'flex-end' : 'flex-start')};
  max-width: 80%;
`;

const InputArea = styled.form`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  border-top: 1px solid #ccc;
`;

interface Props {
  open: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<Props> = ({ open, onClose }) => {
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>(() => {
    const stored = sessionStorage.getItem('chat');
    return stored ? JSON.parse(stored) : [];
  });
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sessionStorage.setItem('chat', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user' as const, text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setInput('');
    const reply = await sendMessage(input);
    setMessages(msgs => [...msgs, { from: 'bot', text: reply }]);
  };

  return (
    <Wrapper open={open} aria-label="Chatbot sidebar">
      <Messages>
        {messages.map((m, i) => (
          <Bubble key={i} from={m.from}>{m.text}</Bubble>
        ))}
        <div ref={messagesEndRef} />
      </Messages>
      <InputArea onSubmit={handleSubmit}>
        <input
          aria-label="Message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit">Send</button>
        <button type="button" onClick={onClose} aria-label="Close chat">×</button>
      </InputArea>
    </Wrapper>
  );
};

export default Chatbot;
