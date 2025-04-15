import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import ErrorDisplay from '@/components/ErrorDisplay.vue';

describe('ErrorDisplay.vue', () => {
  it('does not render when there is no error', () => {
    render(ErrorDisplay, {
      props: {
        error: null
      }
    });

    expect(document.body.textContent).toBe('');
  });

  it('renders the error message when there is an error', () => {
    const errorMessage = 'Test error message';

    render(ErrorDisplay, {
      props: {
        error: errorMessage
      }
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(document.querySelector('i.i-ant-design\\:i-exclamation-circle-filled')).toBeInTheDocument();
  });

  it('applies the correct styling classes', () => {
    render(ErrorDisplay, {
      props: {
        error: 'Test error'
      }
    });

    const errorContainer = screen.getByText('Test error').closest('div').parentElement;
    expect(errorContainer.className).toContain('bg-red-50');
  });
});
