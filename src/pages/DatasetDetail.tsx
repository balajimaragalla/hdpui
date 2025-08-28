import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Dataset, fetchDatasets } from '../services/datasetService';

const tabs = ['Overview', 'Permissions', 'Lineage', 'Usage'] as const;

const DatasetDetail: React.FC = () => {
  const { id } = useParams();
  const { data: datasets = [] } = useQuery<Dataset[]>({ queryKey: ['datasets'], queryFn: fetchDatasets });
  const dataset = datasets.find(d => d.id === Number(id));
  const [tab, setTab] = useState<typeof tabs[number]>('Overview');

  if (!dataset) return <div>Loading...</div>;

  return (
    <div>
      <Link to="/">← Back to search</Link>
      <h2>{dataset.name}</h2>
      <div role="tablist" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {tabs.map(t => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div>
        {tab === 'Overview' && <pre>{JSON.stringify(dataset, null, 2)}</pre>}
        {tab === 'Permissions' && <div>Permissions coming soon...</div>}
        {tab === 'Lineage' && <div>Lineage coming soon...</div>}
        {tab === 'Usage' && <div>Usage coming soon...</div>}
      </div>
    </div>
  );
};

export default DatasetDetail;
