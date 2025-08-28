import React, { useState } from 'react';

const datasets = ['CustomerProfiles', 'SalesData', 'Inventory', 'Marketing'];

const DatasetSearch: React.FC = () => {
  const [query, setQuery] = useState('');

  const results = datasets.filter((d) =>
    d.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>Search Datasets</h2>
      <input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  );
};

export default DatasetSearch;
