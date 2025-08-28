import React, { useState } from 'react';

const TenantOnboarding: React.FC = () => {
  const [form, setForm] = useState({
    applicationId: '',
    services: '',
    acl: '',
    legalEntity: '',
    visibility: 'private',
    useCases: '',
    permissions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Onboarding request submitted');
  };

  return (
    <div>
      <h2>Onboard Application</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="applicationId"
          placeholder="Application ID (NAR ID)"
          value={form.applicationId}
          onChange={handleChange}
        />
        <input
          name="services"
          placeholder="Services Required"
          value={form.services}
          onChange={handleChange}
        />
        <input
          name="acl"
          placeholder="Developer ACL"
          value={form.acl}
          onChange={handleChange}
        />
        <input
          name="legalEntity"
          placeholder="Controlling Legal Entity"
          value={form.legalEntity}
          onChange={handleChange}
        />
        <select name="visibility" value={form.visibility} onChange={handleChange}>
          <option value="private">Private</option>
          <option value="published">Published</option>
        </select>
        {form.visibility === 'published' && (
          <input
            name="useCases"
            placeholder="Use Cases"
            value={form.useCases}
            onChange={handleChange}
          />
        )}
        <textarea
          name="permissions"
          placeholder="Permissions / OPA policies"
          value={form.permissions}
          onChange={handleChange}
        />
        <button type="submit" className="primary">Submit</button>
      </form>
    </div>
  );
};

export default TenantOnboarding;
