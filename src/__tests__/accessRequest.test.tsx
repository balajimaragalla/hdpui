import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatasetAccessRequest from '../pages/DatasetAccessRequest';
import { renderWithProviders } from '../tests/testUtils';

test('submits access request and lists it', async () => {
  renderWithProviders(<DatasetAccessRequest />);
  const datasetSelect = await screen.findByLabelText(/Dataset\(s\)/i);
  await userEvent.selectOptions(datasetSelect, ['1']);
  await userEvent.type(screen.getByLabelText(/Controlling Legal Entity/i), 'DB AG');
  await userEvent.type(screen.getByLabelText(/Purpose/i), 'testing');
  await userEvent.type(screen.getByLabelText(/Start Date/i), '2024-01-01');
  await userEvent.type(screen.getByLabelText(/End Date/i), '2024-02-01');
  await userEvent.click(screen.getByText(/Request Access/i));
  expect(await screen.findByText(/testing - pending/i)).toBeInTheDocument();
});
