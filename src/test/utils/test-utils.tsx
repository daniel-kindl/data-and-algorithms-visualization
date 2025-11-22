import { render as rtlRender, type RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@context/ThemeContext';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialRoute?: string;
}

/**
 * Custom render function that wraps components with common providers
 */
export function renderWithProviders(
  ui: ReactElement,
  { initialRoute = '/', ...renderOptions }: CustomRenderOptions = {},
) {
  if (initialRoute !== '/') {
    window.history.pushState({}, 'Test page', initialRoute);
  }

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <BrowserRouter>
        <ThemeProvider>{children}</ThemeProvider>
      </BrowserRouter>
    );
  }
  Wrapper.displayName = 'TestWrapper';

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything from testing library
/* eslint-disable react-refresh/only-export-components -- Test utilities file exports both helpers and re-exports */
export * from '@testing-library/react';
export { renderWithProviders as render };
