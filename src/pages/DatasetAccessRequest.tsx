import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dataset, fetchDatasets } from '../services/datasetService';

interface Request {
  datasets: number[];
  entity: string;
  purpose: string;
  start: string;
  end: string;
  status: 'pending' | 'approved' | 'rejected';
}

const DatasetAccessRequest: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<Omit<Request, 'status'>>();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => { fetchDatasets().then(setDatasets); }, []);

  const onSubmit = (data: Omit<Request, 'status'>) => {
    setRequests(reqs => [...reqs, { ...data, status: 'pending' }]);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap: '0.5rem', maxWidth: '500px' }}>
        <label>
          Dataset(s)
          <select multiple {...register('datasets')} size={3}>
            {datasets.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </label>
        <label>
          Controlling Legal Entity
          <input {...register('entity')} />
        </label>
        <label>
          Purpose
          <input {...register('purpose')} />
        </label>
        <label>
          Start Date
          <input type="date" {...register('start')} />
        </label>
        <label>
          End Date
          <input type="date" {...register('end')} />
        </label>
        <button type="submit">Request Access</button>
      </form>

      <h2>Existing Requests</h2>
      <ul>
        {requests.map((r, i) => (
          <li key={i}>{r.purpose} - {r.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default DatasetAccessRequest;
