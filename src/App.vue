<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <div class="container px-6 py-6 w-screen h-screen min-w-screen max-w-screen min-h-screen max-h-screen m-0 p-0">
      <h1 class="text-2xl font-bold mb-6 text-center">Noodler's Ink Selector</h1>

      <InksTable :displayed-inks="filteredInks" :ink-store="$inkStore">
        <template #filters>
          <InkFilters @filter-change="handleFilterChange" />
        </template>
      </InksTable>

      <ErrorDisplay :error="$inkStore.error" />
    </div>
  </div>
</template>

<script setup>
import InksTable from './components/InksTable.vue'
import InkFilters from './components/InkFilters.vue'
import ErrorDisplay from './components/ErrorDisplay.vue'
import { useInkStore } from './stores/inks'
import { ref } from 'vue'

const $inkStore = useInkStore()
const filteredInks = ref($inkStore.filteredInks)

const handleFilterChange = ({ filters, color }) => {
  $inkStore.applyFilters(filters, color)
  filteredInks.value = $inkStore.filteredInks
}
</script>

<style>
</style>
