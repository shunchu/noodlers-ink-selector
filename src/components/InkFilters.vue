<template>
  <div class="filters">
    <h4 class="text-left">Filters</h4>

    <ul class="text-left">
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="archival" v-on:click="updateInks" v-model="filters">
          Archival
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="exclusive" v-on:click="updateInks" v-model="filters">
          Exclusive
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="freezeResistant" v-on:click="updateInks" v-model="filters">
          Freeze Resistant
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="fluorescent" v-on:click="updateInks" v-model="filters">
          Fluorescent
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="lubricated" v-on:click="updateInks" v-model="filters">
          Lubricated
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="tamperProof" v-on:click="updateInks" v-model="filters">
          Tamper Proof
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="uvResistant" v-on:click="updateInks" v-model="filters">
          UV/Bleach Resistant
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="waterproof" v-on:click="updateInks" v-model="filters">
          Waterproof
        </label>
      </li>
    </ul>

    <div class="color-filters">
      <h4 class="text-left">Color</h4>
      <select class="form-select" v-model="selectColor">
        <option value="all">All Colors</option>
        <option v-for="color in availableColors" v-bind:value="color">
          {{ color }}
        </option>
      </select>
    </div>

    <div class="license">
      <p>This project is open sourced under <a href="https://github.com/shunchu/noodlers-ink-selector/blob/develop/LICENSE" target="_blank">MIT License</a>.</p>
      <p>
        <span class="font-weight-bold">< </span>
        <a href="https://github.com/shunchu/noodlers-ink-selector" target="_blank">Fork it</a>
        <span class="font-weight-bold"> ></span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useInkStore } from '@/stores/inks'

const inkStore = useInkStore()

const filters = computed({
  get: () => inkStore.filters,
  set: (value) => { 
    inkStore.filters = value
    inkStore.filterInks()
  }
})

const selectColor = computed({
  get: () => inkStore.selectColor,
  set: (value) => { 
    inkStore.selectColor = value
    inkStore.filterInks()
  }
})

// Get unique colors from all ink color arrays
const availableColors = computed(() => {
  const colors = new Set()
  inkStore.inks.forEach(ink => {
    if (ink.colors && ink.colors.length) {
      ink.colors.forEach(color => colors.add(color))
    }
  })
  return Array.from(colors).sort()
})

// Initial filter run
inkStore.filterInks()
</script>

<style scoped>
.filters {
  position: sticky;
  top: 1rem;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 0.25rem;
}

.color-filters {
  margin-top: 1.5rem;
}

h4 {
  padding-left: 40px;
}

ul li, select {
  font-size: 0.85rem;
}

.license {
  font-size: 0.8rem;
  padding: 10px;
}

.license {
  margin: 1.5rem 0 0;
}

.license p {
  margin: 0.2rem;
}
</style>
