import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TenantOnboarding from '../pages/TenantOnboarding';
import { renderWithProviders } from '../tests/testUtils';

test('progresses through onboarding steps', async () => {
  renderWithProviders(<TenantOnboarding />);
  await userEvent.type(screen.getByLabelText(/Application ID/i), 'app1');
  await userEvent.type(screen.getByLabelText(/Application Name/i), 'My App');
  await userEvent.click(screen.getByText(/next/i));
  expect(await screen.findByText(/Services Required/i)).toBeInTheDocument();
});
