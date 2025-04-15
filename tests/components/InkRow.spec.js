import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { createPinia, setActivePinia } from 'pinia';
import InkRow from '@/components/InkRow.vue';

describe('InkRow.vue', () => {
  const mockInk = {
    name: 'Test Ink',
    stockNo: '12345',
    colors: ['blue', 'black'],
    uvResistant: true,
    archival: 'partial',
    tamperProof: false,
    waterproof: true,
    fluorescent: false,
    lubricated: false,
    freezeResistant: false,
    exclusive: true,
    notes: 'Test notes'
  };

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  it('renders the ink information correctly', () => {
    render(InkRow, {
      props: {
        ink: mockInk
      }
    });

    expect(screen.getByText('Test Ink')).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('Blue, Black')).toBeInTheDocument();
    expect(screen.getByText('Test notes')).toBeInTheDocument();
  });

  it('displays the correct icons for different property values', () => {
    render(InkRow, {
      props: {
        ink: mockInk
      }
    });

    const icons = document.querySelectorAll('i.i-fw');
    expect(icons.length).toBe(8);

    const checkIcons = document.querySelectorAll('i.i-ant-design\\:check-circle-filled');
    const timesIcons = document.querySelectorAll('i.i-ant-design\\:close-circle-filled');
    const partialIcons = document.querySelectorAll('i.i-ant-design\\:exclamation-circle-filled');

    expect(checkIcons.length).toBe(3);
    expect(timesIcons.length).toBe(4);
    expect(partialIcons.length).toBe(1);
  });

  it('formats colors correctly', async () => {
    const { unmount } = render(InkRow, {
      props: {
        ink: { ...mockInk, colors: ['red', 'green', 'blue'] }
      }
    });
    expect(screen.getByText('Red, Green, Blue')).toBeInTheDocument();
    unmount();

    render(InkRow, {
      props: {
        ink: { ...mockInk, colors: ['purple'] }
      }
    });
    expect(screen.getByText('Purple')).toBeInTheDocument();
  });

  it('handles different property values correctly', () => {
    const variedInk = {
      ...mockInk,
      uvResistant: true,
      archival: 'partial',
      tamperProof: false,
      waterproof: 'unknown',
      fluorescent: null,
      lubricated: undefined,
      freezeResistant: '',
      exclusive: true
    };

    render(InkRow, {
      props: {
        ink: variedInk
      }
    });

    const icons = document.querySelectorAll('i.i-fw');
    const yesIcon = Array.from(icons).find(icon => icon.title === 'Yes');
    const noIcon = Array.from(icons).find(icon => icon.title === 'No');
    const partialIcon = Array.from(icons).find(icon => icon.title === 'Partial');
    const unknownIcon = Array.from(icons).find(icon => icon.title === 'Unknown');

    expect(yesIcon).toBeTruthy();
    expect(noIcon).toBeTruthy();
    expect(partialIcon).toBeTruthy();
    expect(unknownIcon).toBeTruthy();
  });
});
