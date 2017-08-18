<template>
  <div class="filters">
    <h4 class="text-left">Filters</h4>

    <ul class="text-left">
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="archival" v-on:click="updateInks" v-model="$store.state.filters">
          <i class="icon-history"></i>
          Archival
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="freezeResistant" v-on:click="updateInks" v-model="$store.state.filters">
          <i class="icon-snowflake-o"></i>
          Freeze Resistant
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="uvGlow" v-on:click="updateInks" v-model="$store.state.filters">
          <i class="icon-eye-plus"></i>
          Glow under UV
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="forSecurityDocs" v-on:click="updateInks" v-model="$store.state.filters">
          <i class="icon-lock"></i>
          Ideal for Security
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="lubricated" v-on:click="updateInks" v-model="$store.state.filters">
          <i class="icon-tint"></i>
          Lubricated
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="uvResistant" v-on:click="updateInks" v-model="$store.state.filters">
          <i class="icon-sun"></i>
          UV/Bleach Resistant
        </label>
      </li>
      <li>
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" value="waterProof" v-on:click="updateInks" v-model="$store.state.filters">
          <i class="icon-lifebuoy"></i>
          Water Proof
        </label>
      </li>
    </ul>

    <label class="form-check-label">
      <select v-model="selectColor">
        <option value=undefined>-- Select Color --</option>
        <option v-for="(color, index) in colors" :key="index" :value="color">{{ color }}</option>
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
    colors: function () {
      const colorProps = this.$store.state.inks.map(ink => { return ink.colors })
      const uniqueColors = new Set([].concat(...colorProps))
      return [...uniqueColors].sort().filter((color) => color)
    },
    selectColor: {
      get () {
        return this.$store.state.selectedColor
      },
      set (option) {
        const selectedOption = option.length > 0 ? option : undefined
        this.$store.dispatch('selectColor', selectedOption)
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
