import React from 'react';
import styled from 'styled-components';

interface Dataset {
  id: number;
  name: string;
  status: string;
  owner: string;
  tags: string[];
  useCases: string[];
}

interface Props {
  data: Dataset[];
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  sortField: keyof Dataset;
  onSort: (field: keyof Dataset) => void;
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td { padding: 0.5rem; border-bottom: 1px solid #ddd; }
  th { cursor: pointer; text-align: left; }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const SearchResults: React.FC<Props> = ({ data, page, pageSize, onPageChange, sortField, onSort }) => {
  const start = page * pageSize;
  const paginated = data.slice(start, start + pageSize);
  const pages = Math.ceil(data.length / pageSize);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th onClick={() => onSort('name')}>Name {sortField === 'name' && '▲'}</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Tags</th>
            <th>Use Cases</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map(ds => (
            <tr key={ds.id}>
              <td>{ds.name}</td>
              <td>{ds.status}</td>
              <td>{ds.owner}</td>
              <td>{ds.tags.join(', ')}</td>
              <td>{ds.useCases.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <button onClick={() => onPageChange(Math.max(page - 1, 0))} disabled={page === 0}>Prev</button>
        <span>{page + 1} / {pages}</span>
        <button onClick={() => onPageChange(Math.min(page + 1, pages - 1))} disabled={page >= pages - 1}>Next</button>
      </Pagination>
    </>
  );
};

export default SearchResults;
