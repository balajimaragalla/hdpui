import React, { useState } from 'react';

const DatasetAccessRequest: React.FC = () => {
  const [form, setForm] = useState({
    dataset: '',
    legalEntity: '',
    purpose: '',
    duration: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Access request submitted');
  };

  return (
    <div>
      <h2>Request Dataset Access</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="dataset"
          placeholder="Dataset name"
          value={form.dataset}
          onChange={handleChange}
        />
        <input
          name="legalEntity"
          placeholder="Controlling Legal Entity"
          value={form.legalEntity}
          onChange={handleChange}
        />
        <input
          name="purpose"
          placeholder="Purpose"
          value={form.purpose}
          onChange={handleChange}
        />
        <input
          name="duration"
          placeholder="Duration"
          value={form.duration}
          onChange={handleChange}
        />
        <button type="submit" className="primary">Submit</button>
      </form>
    </div>
  );
};

export default DatasetAccessRequest;
