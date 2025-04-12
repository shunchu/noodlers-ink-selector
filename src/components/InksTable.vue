<template>
  <div class="inks-table">
    <div v-if="inkStore.isLoading" class="text-center my-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="noMatchingInks" class="text-danger font-weight-bold">
      No matching inks found
    </div>

    <div v-else>
      <table id="inks-table" class="table table-bordered table-striped sticky-header">
        <thead>
          <tr>
            <th>Name</th>
            <th>Stock#</th>
            <th class="text-center">Color(s)</th>
            <th class="text-center">UV/Bleach Resistant</th>
            <th class="text-center">Archival</th>
            <th class="text-center">Tamper Proof</th>
            <th class="text-center">Waterproof</th>
            <th class="text-center">Fluorescent</th>
            <th class="text-center">Lubricated</th>
            <th class="text-center">Freeze Resistant</th>
            <th class="text-center">Exclusive</th>
            <th class="text-center">Notes</th>
          </tr>
        </thead>
        <tbody>
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
