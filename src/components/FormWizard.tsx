import React, { useState } from 'react';

interface Step {
  label: string;
  content: React.ReactNode;
}

interface Props {
  steps: Step[];
  onSubmit: () => void;
}

// Simple reusable wizard controller for multi-step forms
const FormWizard: React.FC<Props> = ({ steps, onSubmit }) => {
  const [index, setIndex] = useState(0);
  const isLast = index === steps.length - 1;

  return (
    <div>
      <div>{steps[index].content}</div>
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <button disabled={index === 0} onClick={() => setIndex(i => i - 1)}>Back</button>
        {isLast ? (
          <button onClick={onSubmit}>Submit</button>
        ) : (
          <button onClick={() => setIndex(i => i + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default FormWizard;
