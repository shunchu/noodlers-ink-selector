<template>
  <div id="app">
    <div class="row">
      <div class="col-sm-12"><h1>Noodler's Inks Selector</h1></div>
      <ink-filters class="col-sm-2"></ink-filters>
      <inks-table class="col-sm-10"></inks-table>
    </div>
  </div>
</template>


<script>
import InksTable from './components/InksTable'
import InkFilters from './components/InkFilters'

export default {
  name: 'app',
  props: ['colors'],
  data () {
    return {}
  },
  components: {
    InkFilters,
    InksTable
  }
}
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
</style>
