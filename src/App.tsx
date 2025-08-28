import React, { useState } from 'react';
import DatasetSearch from './components/DatasetSearch';
import TenantOnboarding from './components/TenantOnboarding';
import DatasetAccessRequest from './components/DatasetAccessRequest';
import Chatbot from './components/Chatbot';

type View = 'search' | 'onboard' | 'access' | 'chat';

const App: React.FC = () => {
  const [view, setView] = useState<View>('search');

  return (
    <>
      <nav>
        <button onClick={() => setView('search')}>Search Datasets</button>
        <button onClick={() => setView('onboard')}>Onboard App</button>
        <button onClick={() => setView('access')}>Request Access</button>
        <button onClick={() => setView('chat')}>Chatbot</button>
      </nav>
      <main>
        {view === 'search' && <DatasetSearch />}
        {view === 'onboard' && <TenantOnboarding />}
        {view === 'access' && <DatasetAccessRequest />}
        {view === 'chat' && <Chatbot />}
      </main>
    </>
  );
};

export default App;
