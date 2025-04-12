<template>
  <tr class="hover:bg-gray-50">
    <td class="text-left p-2">{{ ink.name }}</td>
    <td class="p-2">{{ ink.stockNo }}</td>
    <td class="p-2">{{ formatColors(ink.colors) }}</td>
    <td class="text-center p-2"><i :class="getIconClass(ink.uvResistant)" :title="formatProperty(ink.uvResistant)"></i></td>
    <td class="text-center p-2"><i :class="getIconClass(ink.archival)" :title="formatProperty(ink.archival)"></i></td>
    <td class="text-center p-2"><i :class="getIconClass(ink.tamperProof)" :title="formatProperty(ink.tamperProof)"></i></td>
    <td class="text-center p-2"><i :class="getIconClass(ink.waterproof)" :title="formatProperty(ink.waterproof)"></i></td>
    <td class="text-center p-2"><i :class="getIconClass(ink.fluorescent)" :title="formatProperty(ink.fluorescent)"></i></td>
    <td class="text-center p-2"><i :class="getIconClass(ink.lubricated)" :title="formatProperty(ink.lubricated)"></i></td>
    <td class="text-center p-2"><i :class="getIconClass(ink.freezeResistant)" :title="formatProperty(ink.freezeResistant)"></i></td>
    <td class="text-center p-2"><i :class="getIconClass(ink.exclusive)" :title="formatProperty(ink.exclusive)"></i></td>
    <td class="text-left p-2">{{ ink.notes }}</td>
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
  'fa-check-circle text-green-500': value === true,
  'fa-times-circle text-red-500': value === false,
  'fa-exclamation-circle text-yellow-500': value === 'partial',
  'fa-question-circle text-blue-500': typeof value !== 'boolean' && typeof value !== 'string'
})
</script>

<style scoped>
tr td {
  font-size: 0.8rem;
  vertical-align: middle;
}
</style>
