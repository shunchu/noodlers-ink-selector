<template>
  <div class="flex flex-row gap-4">
    <div class="flex-shrink-0">
      <slot name="filters"></slot>
    </div>

    <div v-if="displayedInks.length > 0" class="flex-1 min-w-0 overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-300">
      <table class="w-full border-collapse">
        <thead class="bg-gray-100">
          <tr class="border-b border-gray-200">
            <th class="p-1.5 text-xs border-r border-r-[inherit] w-[200px] text-left align-bottom pb-1">Name</th>
            <th class="p-1.5 text-xs border-r border-r-[inherit] w-[40px] align-bottom pb-1"><span>Stock#</span></th>
            <th class="p-1.5 text-xs border-r border-r-[inherit] w-[120px] align-bottom pb-1"><span>Color(s)</span></th>
            <th class="p-1.5 text-xs border-r border-r-[inherit] w-[40px]"><span>UV/Bleach Resist.</span></th>
            <th class="p-1.5 text-xs border-r border-r-[inherit] w-[40px]"><span>Archival</span></th>
            <th class="p-1.5 text-xs border-r border-r-[inherit] w-[40px]"><span>Tamper Proof</span></th>
            <th class="p-1.5 text-xs border-r border-r-[inherit] w-[40px]"><span>Waterproof</span></th>
            <th class="p-1.5 text-xs border-r border-r-[inherit] w-[40px]"><span>Fluorescent</span></th>
            <th class="p-1.5 text-xs border-r border-r-[inherit] w-[40px]"><span>Lubricated</span></th>
            <th class="p-1.5 text-xs border-r border-r-[inherit] w-[40px]"><span>Freeze Resist.</span></th>
            <th class="p-1.5 text-xs border-r border-r-[inherit] w-[40px]"><span>Exclusive</span></th>
            <th class="p-1.5 text-xs max-w-[150px] text-left align-bottom pb-1"><span>Notes</span></th>
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
thead th:nth-child(n+4):not(:last-child) {
  height: 120px;
  max-width: 40px;
  overflow: visible;
  padding-bottom: 0.5rem;
  position: relative;
  transform-origin: left bottom;
  transform: rotate(-75deg);
  vertical-align: bottom;
  white-space: nowrap;
  width: 40px !important;
}

thead th:nth-child(n+4):not(:last-child) span {
  bottom: -15px;
  left: 10px;
  position: absolute;
  text-align: left;
}
</style>
