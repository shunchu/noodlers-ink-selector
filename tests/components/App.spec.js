const InksTableMock = {
  name: 'InksTable',
  props: ['displayedInks'],
  template: '<div data-testid="inks-table"><slot name="filters"></slot></div>'
};

const InkFiltersMock = {
  name: 'InkFilters',
  template: '<div data-testid="ink-filters">Filters Component</div>',
  emits: ['filter-change']
};

const ErrorDisplayMock = {
  name: 'ErrorDisplay',
  props: ['error'],
  template: '<div data-testid="error-display" v-if="error">{{ error }}</div>'
};

vi.mock('@/components/InksTable.vue', () => ({
  default: {
    name: 'InksTable',
    props: ['displayedInks'],
    template: '<div data-testid="inks-table"><slot name="filters"></slot></div>'
  }
}));

vi.mock('@/components/InkFilters.vue', () => ({
  default: {
    name: 'InkFilters',
    template: '<div data-testid="ink-filters">Filters Component</div>',
    emits: ['filter-change']
  }
}));

vi.mock('@/components/ErrorDisplay.vue', () => ({
  default: {
    name: 'ErrorDisplay',
    props: ['error'],
    template: '<div data-testid="error-display" v-if="error">{{ error }}</div>'
  }
}));

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
import { screen, render } from '@testing-library/vue';
import { renderWithPinia, mockInks } from '../test-utils';
import App from '@/App.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useInkStore } from '@/stores/inks';

describe('App.vue', () => {
  let store;

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
    store = useInkStore();
    store.inks = [...mockInks];
    store.filteredInks = [...mockInks];
    store.error = null;
  });

  it('renders the application with the correct title', async () => {
    renderWithPinia(App);

    expect(screen.getByText("Noodler's Ink Selector")).toBeInTheDocument();
  });

  it('renders the InksTable component', async () => {
    renderWithPinia(App);

    expect(screen.getByTestId('inks-table')).toBeInTheDocument();
  });

  it('renders the InkFilters component inside the filters slot', async () => {
    renderWithPinia(App);

    const inksTable = screen.getByTestId('inks-table');
    const inkFilters = screen.getByTestId('ink-filters');

    expect(inksTable.contains(inkFilters)).toBe(true);
  });

  it('does not display an error when there is no error', async () => {
    store.error = null;

    const customRender = (component) => {
      return render(component, {
        global: {
          plugins: [createPinia()],
          components: {
            InksTable: InksTableMock,
            InkFilters: InkFiltersMock,
            ErrorDisplay: ErrorDisplayMock
          }
        }
      });
    };

    customRender(App);

    expect(screen.queryByTestId('error-display')).not.toBeInTheDocument();
  });

  it('displays an error when there is an error in the store', async () => {
    store.error = 'Test error message';

    const customRender = (component) => {
      return render(component, {
        global: {
          plugins: [createPinia()],
          components: {
            InksTable: InksTableMock,
            InkFilters: InkFiltersMock,
            ErrorDisplay: ErrorDisplayMock
          },
          mocks: {
            $inkStore: store
          }
        }
      });
    };

    customRender(App);

    const errorDisplay = screen.getByTestId('error-display');
    expect(errorDisplay).toBeInTheDocument();
    expect(errorDisplay.textContent).toBe('Test error message');
  });
});
