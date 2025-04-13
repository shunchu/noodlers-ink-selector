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

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/vue';
import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import InkFilters from '@/components/InkFilters.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useInkStore } from '@/stores/inks';
import { availableFilters } from '@/constants/filters';

describe('InkFilters.vue > triggers filterInks', () => {
  it('triggers filterInks when a filter checkbox is clicked', async () => {
    const user = userEvent.setup();
    const pinia = createPinia();
    setActivePinia(pinia);

    const store = useInkStore();
    store.initialize();

    const filterInksSpy = vi.spyOn(store, 'filterInks');

    render(InkFilters, {
      global: {
        plugins: [pinia]
      }
    });

    filterInksSpy.mockClear();

    const archivalCheckbox = screen.getByLabelText('Archival');
    await user.click(archivalCheckbox);

    expect(filterInksSpy).toHaveBeenCalled();
  });

  it('filters inks by property when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const pinia = createPinia();
    setActivePinia(pinia);

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
    const pinia = createPinia();
    setActivePinia(pinia);

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
    expect(inkNames).not.toContain('ink1');
  });

  it('combines property and color filters correctly', async () => {
    const user = userEvent.setup();
    const pinia = createPinia();
    setActivePinia(pinia);

    const store = useInkStore();
    await store.initialize();

    render(InkFilters, {
      global: {
        plugins: [pinia]
      }
    });

    const colorDropdown = screen.getByRole('combobox');
    await user.selectOptions(colorDropdown, 'blue');

    const exclusiveCheckbox = screen.getByLabelText('Exclusive');
    await user.click(exclusiveCheckbox);

    expect(store.filteredInks).toHaveLength(1);
    expect(store.filteredInks[0].name).toBe('ink2');
  });
});

describe('InkFilters.vue', () => {
  let store;

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
    store = useInkStore();
    store.initialize();
  });

  it('displays all available filters', async () => {
    render(InkFilters, {
      global: {
        plugins: [createPinia()]
      }
    });

    availableFilters.forEach((filter) => {
      expect(screen.getByLabelText(filter.label)).toBeInTheDocument();
    });
  });

  it('displays the color dropdown with correct options', async () => {
    render(InkFilters, {
      global: {
        plugins: [createPinia()]
      }
    });

    const colorLabel = screen.getByText('Color:');
    const colorDropdown = colorLabel.closest('div').querySelector('select');

    expect(colorDropdown).toBeInTheDocument();
    expect(screen.getByText('All Colors')).toBeInTheDocument();
    expect(screen.getByText('Brown')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
    expect(screen.getByText('Black')).toBeInTheDocument();
  });

  it('shows the credit information', async () => {
    render(InkFilters, {
      global: {
        plugins: [createPinia()]
      }
    });

    expect(screen.getByText(/Credit:/)).toBeInTheDocument();
    expect(screen.getByText(/Data used with permission/)).toBeInTheDocument();

    const link = screen.getByText("Noodler's Ink Properties spreadsheet");
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('http://noodlersink.com/noodlers-ink-properties/');
    expect(link.getAttribute('target')).toBe('_blank');
  });
});
