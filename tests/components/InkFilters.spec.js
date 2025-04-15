import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createPinia, setActivePinia } from 'pinia';
import { useInkStore } from '@/stores/inks';
import InkFilters from '@/components/InkFilters.vue';
import { availableFilters } from '@/constants/filters';

vi.mock('@/source_data', () => ({
  default: () => [
    {
      name: 'ink1',
      stockNo: '12345',
      colors: ['brown'],
      uvResistant: true,
      archival: true,
      tamperProof: true,
      waterproof: true,
      fluorescent: false,
      lubricated: false,
      freezeResistant: false,
      exclusive: false,
      notes: ''
    },
    {
      name: 'ink2',
      stockNo: '67890',
      colors: ['blue'],
      uvResistant: true,
      archival: true,
      tamperProof: true,
      waterproof: true,
      fluorescent: false,
      lubricated: false,
      freezeResistant: false,
      exclusive: true,
      notes: 'Love Inks Inc exclusive'
    },
    {
      name: 'ink3',
      stockNo: '45678',
      colors: ['blue', 'black'],
      uvResistant: 'partial',
      archival: 'partial',
      tamperProof: true,
      waterproof: true,
      fluorescent: false,
      lubricated: false,
      freezeResistant: false,
      exclusive: false,
      notes: ''
    }
  ]
}));

describe('InkFilters.vue', () => {
  let pinia;
  
  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    vi.clearAllMocks();
  });

  it('triggers filterInks when a filter checkbox is clicked', async () => {
    const user = userEvent.setup();
    const store = useInkStore();
    await store.initialize();

    render(InkFilters, {
      global: {
        plugins: [pinia]
      }
    });

    const archivalCheckbox = screen.getByLabelText('Archival');
    await user.click(archivalCheckbox);

    expect(store.filters).toContain('archival');
  });

  it('filters inks by property when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const store = useInkStore();
    await store.initialize();

    render(InkFilters, {
      global: {
        plugins: [pinia]
      }
    });

    const exclusiveCheckbox = screen.getByLabelText('Exclusive');
    await user.click(exclusiveCheckbox);

    expect(store.filters).toContain('exclusive');
    expect(store.filteredInks).toHaveLength(1);
    expect(store.filteredInks[0].name).toBe('ink2');
  });

  it('filters inks by color when dropdown is changed', async () => {
    const user = userEvent.setup();
    const store = useInkStore();
    await store.initialize();

    render(InkFilters, {
      global: {
        plugins: [pinia]
      }
    });

    const colorDropdown = screen.getByRole('combobox');
    await user.selectOptions(colorDropdown, 'blue');

    expect(store.selectColor).toBe('blue');
    expect(store.filteredInks).toHaveLength(2);
    
    const inkNames = store.filteredInks.map(ink => ink.name);
    expect(inkNames).toContain('ink2');
    expect(inkNames).toContain('ink3');
  });

  it('displays all available filters', async () => {
    const store = useInkStore();
    await store.initialize();

    render(InkFilters, {
      global: {
        plugins: [pinia]
      }
    });

    availableFilters.forEach((filter) => {
      expect(screen.getByLabelText(filter.label)).toBeInTheDocument();
    });
  });

  it('shows the credit information', async () => {
    render(InkFilters, {
      global: {
        plugins: [pinia]
      }
    });

    expect(screen.getByText(/Credit:/)).toBeInTheDocument();
    expect(screen.getByText(/Data used with permission/)).toBeInTheDocument();
  });
});
