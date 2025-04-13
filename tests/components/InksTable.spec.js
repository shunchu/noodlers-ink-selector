import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, render } from '@testing-library/vue';
import InksTable from '@/components/InksTable.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useInkStore } from '@/stores/inks';

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

vi.mock('@/components/InkRow.vue', () => ({
  default: {
    props: ['ink'],
    template: '<tr data-testid="ink-row"><td data-testid="ink-name">{{ ink.name }}</td></tr>'
  }
}));

describe('InksTable.vue', () => {
  let store;

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
    store = useInkStore();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the component with filter slot', async () => {
    render(InksTable, {
      global: {
        plugins: [createPinia()]
      },
      slots: {
        filters: '<div data-testid="filter-content">Filter Content</div>'
      }
    });

    expect(screen.getByTestId('filter-content')).toBeInTheDocument();
  });

  it('handles empty state correctly', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const emptyStore = useInkStore();

    emptyStore.inks = [];
    emptyStore.filteredInks = [];

    render(InksTable, {
      global: {
        plugins: [pinia]
      }
    });

    expect(screen.getByText(/0 inks available/)).toBeInTheDocument();
  });

  it('displays filtered inks based on store state', async () => {
    await store.initialize();

    store.filters = ['exclusive'];
    await store.filterInks();

    expect(store.filteredInks.length).toBe(1);
    expect(store.filteredInks[0].name).toBe('ink2');
  });

  it('displays blue inks when blue color filter is applied', async () => {
    await store.initialize();

    store.selectColor = 'blue';
    await store.filterInks();

    expect(store.filteredInks.length).toBe(2);
    const inkNames = store.filteredInks.map(ink => ink.name);
    expect(inkNames).toContain('ink2');
    expect(inkNames).toContain('ink3');
    expect(inkNames).not.toContain('ink1');
  });

  it('combines property and color filters correctly', async () => {
    await store.initialize();

    store.selectColor = 'blue';
    store.filters = ['exclusive'];
    await store.filterInks();

    expect(store.filteredInks.length).toBe(1);
    expect(store.filteredInks[0].name).toBe('ink2');
  });

  it('shows all inks when no filters are applied', async () => {
    await store.initialize();

    store.selectColor = 'all';
    store.filters = [];
    await store.filterInks();

    expect(store.filteredInks.length).toBe(3);
    const inkNames = store.filteredInks.map(ink => ink.name);
    expect(inkNames).toContain('ink1');
    expect(inkNames).toContain('ink2');
    expect(inkNames).toContain('ink3');
  });
});
