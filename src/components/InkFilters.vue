<template>
  <div class="w-full md:w-50 p-3 bg-gray-100 rounded-md border border-gray-300 md:sticky md:top-4 mb-4 md:mb-0">
    <h3 class="text-lg font-medium mb-2 border-b pb-2">Filter Inks</h3>

    <div class="filter-checkboxes flex flex-col space-y-2">
      <div v-for="filter in availableFilters" :key="filter.id" class="flex flex-row items-center">
        <input
          type="checkbox"
          :id="filter.id"
          :value="filter.id"
          v-model="selectedFilters"
          class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-5 h-5"
        >
        <label :for="filter.id" class="text-sm text-gray-700 truncate select-none cursor-pointer">{{ filter.label }}</label>
      </div>
    </div>

    <div class="mt-3">
      <label class="block mb-1 text-sm font-medium">Color:</label>
      <select
        v-model="selectedColor"
        class="w-full p-2 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 min-h-[40px]"
      >
        <option value="all">All Colors</option>
        <option
          v-for="color in availableColors"
          :key="color"
          :value="color"
        >
          {{ color.charAt(0).toUpperCase() + color.slice(1) }}
        </option>
      </select>
    </div>

    <div class="text-xs mt-4 px-2 py-2">
      <p class="credit mb-1 text-center">
        <strong>Credit:</strong> Data used with permission from Noodler's. <a href="https://www.gouletpens.com/pages/noodlers-ink-properties-chart" class="text-blue-6" target="_blank">Download</a> Noodler's Ink Properties spreadsheet.
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useInkStore } from '@/stores/inks'
import { availableFilters } from '@/constants/filters'

const inkStore = useInkStore()
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
@media (max-width: 768px) {
  .w-50 {
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
  }
  .p-3 {
    padding: 1rem 0.5rem !important;
  }
  .mb-4 {
    margin-bottom: 1.5rem !important;
  }
  select {
    min-height: 44px;
    font-size: 0.8rem;
  }
  input[type="checkbox"] {
    width: 1.2em;
    height: 1.2em;
  }
  .filter-checkboxes {
    display: grid !important;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0 1rem;
  }
  .filter-checkboxes label,
  .filter-checkboxes input,
  .filter-checkboxes select,
  .filter-checkboxes option,
  .filter-checkboxes .text-sm,
  .filter-checkboxes .text-lg,
  h3,
  label,
  .text-xs {
    font-size: 0.8rem !important;
  }
  h3 {
    font-size: 14px !important;
  }
}
</style>
