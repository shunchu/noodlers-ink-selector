<template>
  <div class="w-50 p-3 bg-gray-100 rounded-md border border-gray-300 sticky top-4">
    <h3 class="text-lg font-medium mb-2 border-b pb-2">Filter Inks</h3>

    <div class="space-y-2">
      <div v-for="filter in availableFilters" :key="filter.id" class="flex items-center">
        <input
          type="checkbox"
          :id="filter.id"
          :value="filter.id"
          v-model="selectedFilters"
          class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        >
        <label :for="filter.id" class="text-sm text-gray-700 truncate">{{ filter.label }}</label>
      </div>
    </div>

    <div class="mt-3">
      <label class="block mb-1 text-sm font-medium">Color:</label>
      <select
        v-model="selectedColor"
        class="w-full p-1.5 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
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
        <strong>Credit:</strong> Data used with permission with <a href="http://noodlersink.com/noodlers-ink-properties/" class="text-blue-6" target="_blank">Noodler's Ink Properties spreadsheet</a>.
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
/* All styles converted to UnoCSS classes */
</style>
