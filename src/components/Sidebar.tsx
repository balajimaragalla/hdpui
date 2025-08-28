import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Container = styled.aside`
  grid-row: 2 / -1;
  grid-column: 1 / 2;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 200px;

  @media (max-width: 768px) {
    grid-row: 2;
    grid-column: 1 / -1;
    flex-direction: row;
    overflow-x: auto;
  }
`;

const Link = styled(NavLink)`
  &.active {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Sidebar: React.FC = () => (
  <Container aria-label="Main navigation">
    <Link to="/">Dataset Search</Link>
    <Link to="/onboarding">Onboarding</Link>
    <Link to="/access">Access Request</Link>
  </Container>
);

export default Sidebar;
