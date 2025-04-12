<template>
  <div class="p-4 bg-gray-50 rounded-lg">
    <h3 class="text-lg font-medium mb-3">Filter Inks</h3>
    
    <div class="space-y-3">
      <div v-for="filter in availableFilters" :key="filter.id">
        <label class="flex items-center space-x-2">
          <input 
            type="checkbox" 
            :value="filter.id"
            v-model="selectedFilters"
            class="rounded text-blue-500"
          >
          <span>{{ filter.label }}</span>
        </label>
      </div>
    </div>
    
    <div class="mt-4">
      <label class="block mb-1">Color:</label>
      <select 
        v-model="selectedColor"
        class="w-full p-2 border rounded"
      >
        <option value="all">All Colors</option>
        <option 
          v-for="color in availableColors" 
          :key="color"
          :value="color"
        >
          {{ color }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useInkStore } from '@/stores/inks'

const inkStore = useInkStore()

const availableFilters = [
  { id: 'uvResistant', label: 'UV Resistant' },
  { id: 'archival', label: 'Archival' },
  { id: 'tamperProof', label: 'Tamper Proof' },
  { id: 'waterproof', label: 'Waterproof' },
  { id: 'fluorescent', label: 'Fluorescent' },
  { id: 'lubricated', label: 'Lubricated' },
  { id: 'freezeResistant', label: 'Freeze Resistant' },
  { id: 'exclusive', label: 'Exclusive' }
]

const selectedFilters = ref([])
const selectedColor = ref('all')

const availableColors = computed(() => {
  const colors = new Set()
  inkStore.inks.forEach(ink => {
    ink.colors?.forEach(color => colors.add(color))
  })
  return Array.from(colors).sort()
})

watch([selectedFilters, selectedColor], () => {
  inkStore.filters = selectedFilters.value
  inkStore.selectColor = selectedColor.value
  inkStore.filterInks()
}, { immediate: true })
</script>

<style scoped>
.filters {
  position: sticky;
  top: 1rem;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 0.25rem;
}

.color-filters {
  margin-top: 1.5rem;
}

h4 {
  padding-left: 40px;
}

ul li, select {
  font-size: 0.85rem;
}

.license {
  font-size: 0.8rem;
  padding: 10px;
}

.license {
  margin: 1.5rem 0 0;
}

.license p {
  margin: 0.2rem;
}
</style>
