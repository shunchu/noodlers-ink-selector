<template>
  <div class="flex flex-col md:flex-row gap-4">
    <div class="flex-shrink-0 md:w-auto w-full">
      <slot name="filters"></slot>
    </div>

    <div v-if="displayedInks.length > 0" class="flex-1 min-w-0 h-[calc(100vh-100px)] overflow-y-auto bg-white rounded-lg shadow-sm border border-gray-300 relative">
      <div class="overflow-x-auto">
        <table class="min-w-full border-separate border-spacing-0 text-xs md:text-sm">
          <thead class="bg-gray-100 sticky top-0 z-10">
            <tr class="border-b-2 border-gray-300">
              <th class="p-1.5 text-xs border-r border-r-[inherit] text-left align-bottom pb-2 max-w-75 md:max-w-xl !break-normal">Name</th>
              <th class="p-1.5 text-xs border-r border-r-[inherit] w-[40px] align-bottom pb-2">Stock#</th>
              <th class="p-1.5 text-xs w-[120px] align-bottom pb-2">Color(s)</th>
              <th class="p-1.5 text-xs border-r border-r-[inherit] w-[90px] text-center align-bottom pb-2">UV/Bleach Resist.</th>
              <th class="p-1.5 text-xs border-r border-r-[inherit] w-[90px] text-center align-bottom pb-2">Archival</th>
              <th class="p-1.5 text-xs border-r border-r-[inherit] w-[90px] text-center align-bottom pb-2">Tamper Proof</th>
              <th class="p-1.5 text-xs border-r border-r-[inherit] w-[90px] text-center align-bottom pb-2">Waterproof</th>
              <th class="p-1.5 text-xs border-r border-r-[inherit] w-[90px] text-center align-bottom pb-2">Fluorescent</th>
              <th class="p-1.5 text-xs border-r border-r-[inherit] w-[90px] text-center align-bottom pb-2">Lubricated</th>
              <th class="p-1.5 text-xs border-r border-r-[inherit] w-[90px] text-center align-bottom pb-2">Freeze Resist.</th>
              <th class="p-1.5 text-xs border-r border-r-[inherit] w-[90px] text-center align-bottom pb-2">Exclusive</th>
              <th class="p-1.5 text-xs max-w-[150px] align-bottom pb-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            <InkRow
              v-for="ink in displayedInks"
              :key="ink.name"
              :ink="ink"
              class="hover:bg-gray-50/50 even:bg-gray-200/50"
            />
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="flex-1 p-8 text-center text-gray-500">
      DEBUG: {{ displayedInks.length }} inks available but not rendering
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
</script>

<style scoped>
@media (max-width: 768px) {
  table {
    font-size: 11px;
  }
}
</style>
