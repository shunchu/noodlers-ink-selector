<template>
  <div class="inks-table">
    <div v-if="inkStore.isLoading" class="text-center my-4">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
    
    <div v-else-if="noMatchingInks" class="text-red-500 font-bold p-4">
      No matching inks found
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full border border-gray-200">
        <thead class="bg-gray-100 sticky top-0">
          <tr>
            <th class="p-3 text-left">Name</th>
            <th class="p-3">Stock#</th>
            <th class="p-3 text-center">Color(s)</th>
            <th class="p-3 text-center">UV/Bleach Resistant</th>
            <th class="p-3 text-center">Archival</th>
            <th class="p-3 text-center">Tamper Proof</th>
            <th class="p-3 text-center">Waterproof</th>
            <th class="p-3 text-center">Fluorescent</th>
            <th class="p-3 text-center">Lubricated</th>
            <th class="p-3 text-center">Freeze Resistant</th>
            <th class="p-3 text-center">Exclusive</th>
            <th class="p-3 text-center">Notes</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <ink-row 
            v-for="ink in displayedInks" 
            :key="ink.name" 
            :ink="ink"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useInkStore } from '@/stores/inks'
import InkRow from './InkRow.vue'

const inkStore = useInkStore()

onMounted(async () => {
  await inkStore.initialize()
  await inkStore.filterInks()
})

const displayedInks = computed(() => {
  return inkStore.filteredInks.length > 0 
    ? inkStore.filteredInks 
    : inkStore.inks
})

const noMatchingInks = computed(() => {
  return !inkStore.isLoading && 
         inkStore.filteredInks.length === 0 && 
         inkStore.inks.length > 0
})
</script>

<style scoped>
.sticky-header {
  position: relative;
}
.sticky-header thead th {
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}
</style>
