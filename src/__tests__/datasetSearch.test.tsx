import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatasetSearch from '../pages/DatasetSearch';
import { renderWithProviders } from '../tests/testUtils';

test('filters datasets by search input', async () => {
  renderWithProviders(<DatasetSearch />);
  const searchBox = await screen.findByLabelText(/search/i);
  await userEvent.type(searchBox, 'Trades');
  expect(await screen.findByText('Trades')).toBeInTheDocument();
  expect(screen.queryByText('Payments')).not.toBeInTheDocument();
});
