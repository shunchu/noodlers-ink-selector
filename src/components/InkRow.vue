<template>
  <tr class="group hover:bg-gray-50/50 transition-colors duration-150 border-b border-gray-200">
    <td class="px-1.5 py-1 text-left border-r border-gray-[inherit] text-xs text-gray-800">{{ ink.name }}</td>
    <td class="px-1.5 py-1 border-r border-gray-[inherit] text-xs text-gray-800">{{ ink.stockNo }}</td>
    <td class="px-1.5 py-1 border-r border-gray-[inherit] text-xs text-gray-800 text-center">{{ formatColors(ink.colors) }}</td>
    <td
      v-for="prop in inkProperties"
      :key="prop"
      class="py-1 border-r border-gray-[inherit] text-xs text-center text-gray-800"
    >
      <i :class="getIconClass(ink[prop])" :title="formatProperty(ink[prop])"></i>
    </td>
    <td class="px-1.5 py-1 text-xs text-gray-700/90">{{ ink.notes }}</td>
  </tr>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  ink: {
    type: Object,
    required: true
  }
})

const inkProperties = [
  'uvResistant',
  'archival',
  'tamperProof',
  'waterproof',
  'fluorescent',
  'lubricated',
  'freezeResistant',
  'exclusive'
]

const formatColors = (colors) => {
  if (!colors || !colors.length) return ''
  return colors.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')
}

const formatProperty = (value) => {
  if (value === true) return 'Yes'
  if (value === false) return 'No'
  if (typeof value === 'string') return value.charAt(0).toUpperCase() + value.slice(1)
  return ''
}

const getIconClass = (value) => ({
  'fas': true,
  'fa-check-circle text-green-600': value === true,
  'fa-times-circle text-red-600': value === false,
  'fa-exclamation-circle text-yellow-500': value === 'partial',
  'fa-question-circle text-blue-500': typeof value !== 'boolean' && typeof value !== 'string'
})
</script>

<style scoped>
/* All styles converted to UnoCSS classes */
</style>
