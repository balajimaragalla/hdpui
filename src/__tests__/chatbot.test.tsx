import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chatbot from '../components/Chatbot';
import { renderWithProviders } from '../tests/testUtils';

jest.mock('../services/chatApi', () => ({
  sendMessage: async (text: string) => `You said: ${text}`
}));

test('chatbot sends and displays message', async () => {
  renderWithProviders(<Chatbot open onClose={() => {}} />);
  await userEvent.type(screen.getByLabelText(/Message/i), 'hello');
  await userEvent.click(screen.getByText(/Send/i));
  expect(await screen.findByText('You said: hello')).toBeInTheDocument();
});
