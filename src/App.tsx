import React, { useState } from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chatbot from './components/Chatbot';
import DatasetSearch from './pages/DatasetSearch';
import TenantOnboarding from './pages/TenantOnboarding';
import DatasetAccessRequest from './pages/DatasetAccessRequest';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 60px 1fr;
  min-height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 60px auto 1fr;
  }
`;

const Main = styled.main`
  grid-row: 2 / -1;
  padding: 1rem;
`;

const App: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <Layout>
      <Header onToggleChat={() => setChatOpen(o => !o)} />
      <Sidebar />
      <Main>
        <Routes>
          <Route path="/" element={<DatasetSearch />} />
          <Route path="/onboarding" element={<TenantOnboarding />} />
          <Route path="/access" element={<DatasetAccessRequest />} />
        </Routes>
      </Main>
      <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} />
    </Layout>
  );
};

export default App;
