<template>
  <tr class="group hover:bg-gray-50/50 transition-colors duration-150 border-b border-gray-200">
    <td class="px-1.5 py-1 text-left border-r border-gray-[inherit] text-xs text-gray-800 !break-normal">{{ ink.name }}</td>
    <td class="px-1.5 py-1 border-r border-gray-[inherit] text-xs text-gray-800 break-words max-w-[60px] md:max-w-none">{{ ink.stockNo }}</td>
    <td class="px-1.5 py-1 border-r border-gray-[inherit] text-xs text-gray-800 text-center !break-normal max-w-[90px] md:max-w-none">{{ formatColors(ink.colors) }}</td>
    <td
      v-for="prop in inkProperties"
      :key="prop"
      class="py-1 border-r border-gray-[inherit] text-xs text-center text-gray-800 min-w-[36px] md:min-w-[40px]"
    >
      <i :class="getIconClass(ink[prop])" :title="formatProperty(ink[prop])"></i>
    </td>
    <td class="px-1.5 py-1 text-xs text-gray-700/90 !whitespace-nowrap max-w-[150px] md:max-w-none">{{ ink.notes }}</td>
  </tr>
</template>

<script setup>
import { availableFilters } from '../constants/filters';

const props = defineProps({
  ink: {
    type: Object,
    required: true
  }
})

const inkProperties = availableFilters.map((ink) => ink.id);

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
  'i-fw': true,
  'i-ant-design:check-circle-filled text-green-600': value === true,
  'i-ant-design:close-circle-filled text-red-600': value === false,
  'i-ant-design:exclamation-circle-filled text-yellow-500': value === 'partial',
  'i-ant-design:question-circle-filled text-blue-500': typeof value !== 'boolean' && typeof value !== 'string'
})
</script>

<style scoped>
@media (max-width: 768px) {
  td {
    padding: 0.25rem 0.25rem;
    font-size: 11px;
    word-break: break-word;
  }
  i {
    font-size: 1.1em;
    min-width: 1.5em;
    min-height: 1.5em;
  }
}
</style>
