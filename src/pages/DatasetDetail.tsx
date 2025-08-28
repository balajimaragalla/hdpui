import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Dataset,
  fetchDatasetById,
  updateDataset,
  AclEntry
} from '../services/datasetService';

const tabs = ['Overview', 'Permissions', 'Lineage', 'Usage'] as const;

const DatasetDetail: React.FC = () => {
  const { id } = useParams();
  const datasetId = Number(id);
  const queryClient = useQueryClient();

  const { data: dataset } = useQuery<Dataset | undefined>({
    queryKey: ['dataset', datasetId],
    queryFn: () => fetchDatasetById(datasetId)
  });

  const mutation = useMutation({
    mutationFn: (updates: Partial<Dataset>) => updateDataset(datasetId, updates),
    onSuccess: data => {
      queryClient.setQueryData(['dataset', datasetId], data);
    }
  });

  const [tab, setTab] = useState<typeof tabs[number]>('Overview');

  const [newTag, setNewTag] = useState('');
  const [acl, setAcl] = useState<AclEntry>({ user: '', role: '' });

  if (!dataset) return <div>Loading...</div>;

  const toggleStatus = () => {
    mutation.mutate({ status: dataset.status === 'published' ? 'private' : 'published' });
  };

  const addTag = () => {
    if (!newTag.trim()) return;
    mutation.mutate({ tags: [...dataset.tags, newTag.trim()] });
    setNewTag('');
  };

  const removeTag = (t: string) => {
    mutation.mutate({ tags: dataset.tags.filter(tag => tag !== t) });
  };

  const addAcl = () => {
    if (!acl.user || !acl.role) return;
    mutation.mutate({ acls: [...dataset.acls, acl] });
    setAcl({ user: '', role: '' });
  };

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
        {tab === 'Overview' && (
          <div>
            <p>{dataset.description}</p>
            <div>
              Visibility: {dataset.status}
              <button onClick={toggleStatus} aria-label="Toggle visibility">
                {dataset.status === 'published' ? 'Mark Private' : 'Publish'}
              </button>
            </div>
            <div>
              Tags:
              <ul>
                {dataset.tags.map(t => (
                  <li key={t}>
                    {t} <button onClick={() => removeTag(t)}>x</button>
                  </li>
                ))}
              </ul>
              <input
                aria-label="New tag"
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
              />
              <button onClick={addTag}>Add Tag</button>
            </div>
            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(dataset, null, 2)], {
                  type: 'application/json'
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${dataset.name}.json`;
                a.click();
              }}
            >
              Download Metadata
            </button>
          </div>
        )}
        {tab === 'Permissions' && (
          <div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {dataset.acls.map((a, i) => (
                  <tr key={i}>
                    <td>{a.user}</td>
                    <td>{a.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: '0.5rem' }}>
              <input
                placeholder="user@example.com"
                value={acl.user}
                onChange={e => setAcl({ ...acl, user: e.target.value })}
                aria-label="ACL user"
              />
              <input
                placeholder="role"
                value={acl.role}
                onChange={e => setAcl({ ...acl, role: e.target.value })}
                aria-label="ACL role"
              />
              <button onClick={addAcl}>Add</button>
            </div>
          </div>
        )}
        {tab === 'Lineage' && (
          <div>
            <p>Upstream: {dataset.lineage.upstream.join(', ')}</p>
            <p>Downstream: {dataset.lineage.downstream.join(', ')}</p>
          </div>
        )}
        {tab === 'Usage' && (
          <div>
            <p>Access count: {dataset.accessCount}</p>
            <p>Last queried: {dataset.lastQueried}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatasetDetail;
