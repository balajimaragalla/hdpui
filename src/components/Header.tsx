import React from 'react';
import styled from 'styled-components';

interface Props {
  onToggleChat: () => void;
}

const Bar = styled.header`
  grid-column: 1 / -1;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 1.25rem;
`;

const ChatButton = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
`;

const Header: React.FC<Props> = ({ onToggleChat }) => (
  <Bar>
    <Title>Hybrid Data Platform</Title>
    <ChatButton onClick={onToggleChat} aria-label="Toggle chatbot">Chat</ChatButton>
  </Bar>
);

export default Header;
