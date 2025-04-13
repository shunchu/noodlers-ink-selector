import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
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

    const icons = document.querySelectorAll('i.fas');

    expect(icons.length).toBe(8);

    const checkIcons = document.querySelectorAll('i.fa-check-circle.text-green-600');
    const timesIcons = document.querySelectorAll('i.fa-times-circle.text-red-600');
    const partialIcons = document.querySelectorAll('i.fa-exclamation-circle.text-yellow-500');

    // Based on our mock data, we should have:
    // - 3 check icons (uvResistant, waterproof, exclusive)
    // - 4 times icons (tamperProof, fluorescent, lubricated, freezeResistant)
    // - 1 partial icon (archival)
    expect(checkIcons.length).toBe(3);
    expect(timesIcons.length).toBe(4);
    expect(partialIcons.length).toBe(1);
  });

  it('formats colors correctly', () => {
    const { unmount: unmount1 } = render(InkRow, {
      props: {
        ink: { ...mockInk, colors: ['red', 'green', 'blue'] }
      }
    });
    expect(screen.getByText('Red, Green, Blue')).toBeInTheDocument();
    unmount1();

    const { unmount: unmount2 } = render(InkRow, {
      props: {
        ink: { ...mockInk, colors: ['purple'] }
      }
    });
    expect(screen.getByText('Purple')).toBeInTheDocument();
    unmount2();

    render(InkRow, {
      props: {
        ink: { ...mockInk, colors: [] }
      }
    });

    expect(screen.getByText('Test Ink')).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();

    const cells = document.querySelectorAll('td');
    expect(cells[2].textContent).toBe('');
  });

  it('handles different property values correctly', () => {
    const variedInk = {
      ...mockInk,
      uvResistant: true,           // Yes
      archival: 'partial',         // Partial
      tamperProof: false,          // No
      waterproof: 'unknown',       // Unknown (custom string)
      fluorescent: null,           // Should show question mark
      lubricated: undefined,       // Should show question mark
      freezeResistant: '',         // Empty string
      exclusive: true              // Yes
    };

    render(InkRow, {
      props: {
        ink: variedInk
      }
    });

    const icons = document.querySelectorAll('i.fas');
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
