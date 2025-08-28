import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chatbot from './components/Chatbot';
import DatasetSearch from './pages/DatasetSearch';
import TenantOnboarding from './pages/TenantOnboarding';
import DatasetAccessRequest from './pages/DatasetAccessRequest';
import DatasetDetail from './pages/DatasetDetail';
import { GlobalStyle } from './globalStyles';
import { lightTheme, darkTheme } from './theme';

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
  const [dark, setDark] = useState(false);

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Layout>
        <Header onToggleChat={() => setChatOpen(o => !o)} onToggleTheme={() => setDark(d => !d)} />
        <Sidebar />
        <Main>
          <Routes>
            <Route path="/" element={<DatasetSearch />} />
            <Route path="/dataset/:id" element={<DatasetDetail />} />
            <Route path="/onboarding" element={<TenantOnboarding />} />
            <Route path="/access" element={<DatasetAccessRequest />} />
          </Routes>
        </Main>
        <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
