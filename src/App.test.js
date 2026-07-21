import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the organisation name in the header', () => {
  render(<App />);
  expect(screen.getAllByText(/engape post/i).length).toBeGreaterThan(0);
});
