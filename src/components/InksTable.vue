<template>
  <div class="flex flex-row gap-4">
    <div class="flex-shrink-0">
      <slot name="filters"></slot>
    </div>

    <div v-if="displayedInks.length > 0" class="flex-1 min-w-0 h-[calc(100vh-100px)] overflow-auto bg-white rounded-lg shadow-sm border border-gray-300 relative">
      <table class="w-full border-separate border-spacing-0">
        <thead class="bg-gray-100 sticky top-0 z-10">
          <tr class="border-b-2 border-gray-300">
            <th class="p-1.5 text-xs border-r border-r-[inherit] w-[200px] text-left align-bottom pb-2">Name</th>
            <th class="p-1.5 text-xs border-r border-r-[inherit] w-[40px] align-bottom pb-2"><span>Stock#</span></th>
            <th class="p-1.5 text-xs w-[120px] align-bottom pb-1 border-r-0"><span>Color(s)</span></th>
            <th class="rotated-header"><span>UV/Bleach Resist.</span></th>
            <th class="rotated-header"><span>Archival</span></th>
            <th class="rotated-header"><span>Tamper Proof</span></th>
            <th class="rotated-header"><span>Waterproof</span></th>
            <th class="rotated-header"><span>Fluorescent</span></th>
            <th class="rotated-header"><span>Lubricated</span></th>
            <th class="rotated-header"><span>Freeze Resist.</span></th>
            <th class="rotated-header"><span>Exclusive</span></th>
            <th class="notes-header"><span>Notes</span></th>
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
/* Base styling for rotated header cells - sets dimensions and removes default borders */
.rotated-header {
  @apply p-1.5 text-xs border-r border-r-[inherit] w-[40px] text-center whitespace-nowrap h-[120px] relative p-0 align-bottom border-b-0 border-r-0;
}

/* Container for the Notes header cell */
.notes-header {
  @apply relative p-1.5 text-xs max-w-[150px] align-bottom pb-2;
}

/* Left border styling for Notes header */
.notes-header::before {
  content: '';
  @apply absolute bottom-0 -left-[1px] w-[1px] h-[150px] bg-gray-300;
  transform: rotate(15deg);
  transform-origin: bottom left;
}

/* Main styling for rotated header cells */
thead th.rotated-header {
  @apply relative h-[115px] max-w-[40px] p-0 whitespace-nowrap w-[40px]!;
}

/* Text styling inside rotated headers */
thead th.rotated-header span {
  @apply absolute bottom-0 left-[25px] w-[85px] pl-[5px] pb-[-10px] text-left;
  transform: rotate(-75deg);
  transform-origin: bottom left;
}

/* Right border for rotated header cells */
thead th.rotated-header::before {
  content: '';
  @apply absolute top-0 right-0 w-0 h-full bg-gray-300;
}

/* Bottom border for rotated header cells */
thead th.rotated-header::after {
  content: '';
  @apply absolute bottom-0 left-0 w-[120px] h-0 border-b-2 border-gray-300;
  transform: rotate(-75deg);
  transform-origin: bottom left;
}
</style>
