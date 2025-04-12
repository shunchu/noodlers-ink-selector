<template>
  <tr>
    <td class="text-left">{{ ink.name }}</td>
    <td>{{ ink.stockNo }}</td>
    <td>{{ formatColors(ink.colors) }}</td>
    <td class="text-center">
      <i :class="getIconClass(ink.uvResistant)" :title="formatProperty(ink.uvResistant)"></i>
    </td>
    <td class="text-center">
      <i :class="getIconClass(ink.archival)" :title="formatProperty(ink.archival)"></i>
    </td>
    <td class="text-center">
      <i :class="getIconClass(ink.tamperProof)" :title="formatProperty(ink.tamperProof)"></i>
    </td>
    <td class="text-center">
      <i :class="getIconClass(ink.waterproof)" :title="formatProperty(ink.waterproof)"></i>
    </td>
    <td class="text-center">
      <i :class="getIconClass(ink.fluorescent)" :title="formatProperty(ink.fluorescent)"></i>
    </td>
    <td class="text-center">
      <i :class="getIconClass(ink.lubricated)" :title="formatProperty(ink.lubricated)"></i>
    </td>
    <td class="text-center">
      <i :class="getIconClass(ink.freezeResistant)" :title="formatProperty(ink.freezeResistant)"></i>
    </td>
    <td class="text-center">
      <i :class="getIconClass(ink.exclusive)" :title="formatProperty(ink.exclusive)"></i>
    </td>
    <td class="text-left">{{ ink.notes }}</td>
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
  'bi': true,
  'bi-check-circle-fill text-success': value === true,
  'bi-x-circle-fill text-danger': value === false,
  'bi-exclamation-circle-fill text-warning': value === 'partial',
  'bi-question-circle-fill text-info': typeof value !== 'boolean' && typeof value !== 'string'
})
</script>

<style scoped>
tr td {
  font-size: 0.8rem;
  vertical-align: middle;
}
</style>
