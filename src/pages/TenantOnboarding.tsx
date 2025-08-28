import React from 'react';
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormWizard from '../components/FormWizard';

const schema = z.object({
  appId: z.string().min(1, 'Required'),
  appName: z.string().min(1, 'Required'),
  services: z.array(z.string()).min(1, 'Select at least one service'),
  developers: z.array(z.string().email('Invalid email')).min(1, 'Add at least one developer'),
  entity: z.string().min(1, 'Required'),
  visibility: z.enum(['private', 'published']),
  useCases: z.string().optional(),
  permissions: z.array(z.object({ key: z.string(), value: z.string() }))
});

const servicesList = ['Storage', 'Compute', 'Analytics'];
const entities = ['DB AG', 'DB UK', 'DB US'];

type FormValues = z.infer<typeof schema>;

const Step1 = () => {
  const { register, formState: { errors } } = useFormContext<FormValues>();
  return (
    <div>
      <label>
        Application ID
        <input {...register('appId')} />
      </label>
      {errors.appId && <span>{errors.appId.message}</span>}
      <label>
        Application Name
        <input {...register('appName')} />
      </label>
      {errors.appName && <span>{errors.appName.message}</span>}
    </div>
  );
};

const Step2 = () => {
  const { register, formState: { errors } } = useFormContext<FormValues>();
  return (
    <div>
      <span>Services Required</span>
      {servicesList.map(s => (
        <label key={s} style={{ display: 'block' }}>
          <input type="checkbox" value={s} {...register('services')} /> {s}
        </label>
      ))}
      {errors.services && <span>{errors.services.message}</span>}
    </div>
  );
};

const Step3 = () => {
  const { control, register, formState: { errors } } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({ name: 'developers', control });
  return (
    <div>
      <span>Developer ACL</span>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`developers.${index}` as const)} placeholder="email@example.com" />
          <button type="button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => append('')}>Add Developer</button>
      {errors.developers && <span>{errors.developers.message as string}</span>}
    </div>
  );
};

const Step4 = () => {
  const { register, formState: { errors } } = useFormContext<FormValues>();
  return (
    <div>
      <label>
        Controlling Legal Entity
        <select {...register('entity')}>
          <option value="">Select...</option>
          {entities.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
      </label>
      {errors.entity && <span>{errors.entity.message}</span>}
    </div>
  );
};

const Step5 = () => {
  const { register } = useFormContext<FormValues>();
  return (
    <div>
      <div>
        <label><input type="radio" value="private" {...register('visibility')} /> Private</label>
        <label><input type="radio" value="published" {...register('visibility')} /> Published</label>
      </div>
      <label>
        Use Cases
        <textarea {...register('useCases')} />
      </label>
    </div>
  );
};

const Step6 = () => {
  const { control, register } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({ name: 'permissions', control });
  return (
    <div>
      <span>Permissions Definition</span>
      {fields.map((field, index) => (
        <div key={field.id} style={{ display: 'flex', gap: '0.5rem' }}>
          <input placeholder="key" {...register(`permissions.${index}.key` as const)} />
          <input placeholder="value" {...register(`permissions.${index}.value` as const)} />
          <button type="button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ key: '', value: '' })}>Add Permission</button>
    </div>
  );
};

const Review = () => {
  const { getValues } = useFormContext<FormValues>();
  return (
    <pre aria-label="Review">{JSON.stringify(getValues(), null, 2)}</pre>
  );
};

const TenantOnboarding: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { appId: '', appName: '', services: [], developers: [], entity: '', visibility: 'private', useCases: '', permissions: [] }
  });

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  const steps = [
    { label: 'App Info', content: <Step1 /> },
    { label: 'Services', content: <Step2 /> },
    { label: 'Developers', content: <Step3 /> },
    { label: 'Entity', content: <Step4 /> },
    { label: 'Visibility', content: <Step5 /> },
    { label: 'Permissions', content: <Step6 /> },
    { label: 'Review', content: <Review /> }
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormWizard steps={steps} onSubmit={methods.handleSubmit(onSubmit)} />
      </form>
    </FormProvider>
  );
};

export default TenantOnboarding;
