import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders the organisation name in the header', () => {
  render(<App />);
  expect(screen.getAllByText(/engape post/i).length).toBeGreaterThan(0);
});

test('renders the home page without suspending', () => {
  render(<App />);
  // Home is imported eagerly precisely so the most common landing page paints
  // without waiting on a second round trip. If it ever becomes lazy, the
  // loading placeholder shows up here.
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
});

describe('lazily loaded routes', () => {
  const visit = (path) => {
    window.history.pushState({}, '', path);
    return render(<App />);
  };

  afterEach(() => window.history.pushState({}, '', '/'));

  // These routes are code-split, so a broken dynamic import would not surface
  // until someone actually navigated. Resolve one here instead.
  it('loads the about page chunk on demand', async () => {
    visit('/about-us');
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: /friends of community/i })
      ).toBeInTheDocument()
    );
  });

  it('loads a programme page chunk by slug', async () => {
    visit('/programmes/education');
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: /education & literacy/i })
      ).toBeInTheDocument()
    );
  });
});
