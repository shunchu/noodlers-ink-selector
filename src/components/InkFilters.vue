<template>
  <div class="filters">
    <h4 class="text-left">Filters</h4>

    <ul class="text-left">
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="archival" v-on:click="updateInks" v-model="$store.state.filters">
          Archival
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="exclusive" v-on:click="updateInks" v-model="$store.state.filters">
          Exclusive
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="freezeResistant" v-on:click="updateInks" v-model="$store.state.filters">
          Freeze Resistant
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="fluorescent" v-on:click="updateInks" v-model="$store.state.filters">
          Fluorescent
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="lubricated" v-on:click="updateInks" v-model="$store.state.filters">
          Lubricated
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="tamperProof" v-on:click="updateInks" v-model="$store.state.filters">
          Tamper Proof
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="uvResistant" v-on:click="updateInks" v-model="$store.state.filters">
          UV/Bleach Resistant
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="waterproof" v-on:click="updateInks" v-model="$store.state.filters">
          Waterproof
        </label>
      </li>
    </ul>

    <label class="form-check-label">
      <select class="colors" v-model="selectColor">
        <option value="">-- Select Color --</option>
        <option v-for="(color, index) in availableColors" :key="index" :value="color">{{ color }}</option>
      </select>
    </label>

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


<script>
export default {
  name: 'ink-filters',
  props: ['color'],
  data () {
    return {
      inks: this.$store.state.inks
    }
  },

  methods: {
    updateInks: function () {
      this.$store.dispatch('filterInks')
    }
  },

  computed: {
    availableColors: function () {
      const colorProps = this.$store.state.inks.map(ink => { return ink.colors })
      const uniqueColors = new Set([].concat(...colorProps))
      return [...uniqueColors].sort().filter((color) => color)
    },
    selectColor: {
      get () {
        return this.$store.state.selectedColor
      },
      set (option) {
        this.$store.dispatch('selectColor', option)
      }
    }
  }
}
</script>


<style scoped>
h4 {
  padding-left: 40px;
}

ul {
  list-style-type: none;
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
