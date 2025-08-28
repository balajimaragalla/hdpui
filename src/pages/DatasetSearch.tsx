import React, { useEffect, useState } from 'react';
import SearchResults from '../components/SearchResults';
import { Dataset, fetchDatasets } from '../services/datasetService';

const DatasetSearch: React.FC = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [tag, setTag] = useState('');
  const [page, setPage] = useState(0);
  const [sortField, setSortField] = useState<keyof Dataset>('name');

  useEffect(() => {
    fetchDatasets().then(setDatasets);
  }, []);

  const tags = Array.from(new Set(datasets.flatMap(d => d.tags)));

  const filtered = datasets.filter(d =>
    d.name.toLowerCase().includes(query.toLowerCase()) &&
    (!status || d.status === status) &&
    (!tag || d.tags.includes(tag))
  );

  const sorted = [...filtered].sort((a, b) =>
    String(a[sortField]).localeCompare(String(b[sortField]))
  );

  return (
    <div>
      <form onSubmit={e => e.preventDefault()} style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))' }}>
        <div>
          <label htmlFor="search">Search</label>
          <input id="search" list="dataset-names" value={query} onChange={e => { setQuery(e.target.value); setPage(0); }} />
          <datalist id="dataset-names">
            {datasets.map(d => <option key={d.id} value={d.name} />)}
          </datalist>
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select id="status" value={status} onChange={e => { setStatus(e.target.value); setPage(0); }}>
            <option value="">All</option>
            <option value="published">Published</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div>
          <label htmlFor="tag">Tag</label>
          <select id="tag" value={tag} onChange={e => { setTag(e.target.value); setPage(0); }}>
            <option value="">All</option>
            {tags.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </form>
      <SearchResults
        data={sorted}
        page={page}
        pageSize={5}
        onPageChange={setPage}
        sortField={sortField}
        onSort={setSortField}
      />
    </div>
  );
};

export default DatasetSearch;
