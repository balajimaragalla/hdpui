import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import DatasetDetail from '../pages/DatasetDetail';
import { lightTheme } from '../theme';

const renderPage = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/dataset/1']}>
        <ThemeProvider theme={lightTheme}>
          <Routes>
            <Route path="/dataset/:id" element={<DatasetDetail />} />
          </Routes>
        </ThemeProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

test('allows editing tags and permissions', async () => {
  const { findByText, getByRole, getByLabelText } = renderPage();

  expect(await findByText('Payments')).toBeInTheDocument();

  // add tag
  await userEvent.type(getByLabelText('New tag'), 'urgent');
  await userEvent.click(getByRole('button', { name: /add tag/i }));
  expect(await findByText('urgent')).toBeInTheDocument();

  // permissions tab
  await userEvent.click(getByRole('tab', { name: /permissions/i }));
  expect(await findByText('alice@example.com')).toBeInTheDocument();
  await userEvent.type(getByLabelText('ACL user'), 'new@example.com');
  await userEvent.type(getByLabelText('ACL role'), 'reader');
  await userEvent.click(getByRole('button', { name: /^add$/i }));
  expect(await findByText('new@example.com')).toBeInTheDocument();
});
