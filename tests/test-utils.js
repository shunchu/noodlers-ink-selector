import { render } from '@testing-library/vue';
import { createPinia, setActivePinia } from 'pinia';

// Custom render function that includes Pinia
export function renderWithPinia(component, options = {}) {
  const pinia = createPinia();
  setActivePinia(pinia);

  return render(component, {
    global: {
      plugins: [pinia],
      ...options?.global
    },
    ...options
  });
}

// Mock ink data for testing
export const mockInks = [
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
];
