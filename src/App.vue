<template>
  <div id="app">
    <div class="row">
      <div class="col-sm-12">
        <h1>Noodler's Ink Selector</h1>
        <span class="credit"><span class="font-weight-bold">Credit:</span> Data used here are provided by <a href="http://noodlersink.com/noodlers-ink-properties/" target="_blank">Noodler's Ink Properties spreadsheet</a>.</span>
      </div>
      <InkFilters class="col-sm-2" />
      <InksTable class="col-sm-10" />
    </div>
  </div>
</template>

<script setup>
import InksTable from './components/InksTable.vue'
import InkFilters from './components/InkFilters.vue'
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 1rem;
}

.credit {
  font-size: 0.85rem;
}
</style>
