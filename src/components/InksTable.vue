<template>
  <div class="inks-table">
    <div v-if="noMatchingInks" class="text-danger font-weight-bold">No matching inks found</div>

    <div v-else>
      <table id="inks-table" class="table table-bordered table-striped sticky-header">
        <thead>
          <tr>
            <th>Name</th>
            <th>Stock#</th>
            <th class="text-center">Color(s)</th>
            <th class="text-center">UV/Bleach Resistant</th>
            <th class="text-center">Archival</th>
            <th class="text-center">Ideal for Security</th>
            <th class="text-center">Water Proof</th>
            <th class="text-center">Glows under UV</th>
            <th class="text-center">Lubricated</th>
            <th class="text-center">Freeze Resistant</th>
            <th class="text-center">Notes</th>
          </tr>
        </thead>
        <tbody>
          <ink-row v-for="(ink, index) in inks" v-bind:ink="ink" v-bind:key="ink.index"></ink-row>
        </tbody>
      </table>
    </div>
  </div>
</template>



<script>
import InkRow from './InkRow'

export default {
  name: 'inks-table',
  components: { InkRow },
  data () {
    return {}
  },

  computed: {
    inks: function () {
      return this.$store.state.filteredInks.length > 0 ? this.$store.state.filteredInks : this.$store.state.inks
    },
    noMatchingInks: function () {
      return this.$store.state.filteredInks.length === 0 && this.$store.state.filters.length > 0
    }
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  tr th { font-size: 0.8rem; }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  table thead {
    /* display: block; */
    /* position: fixed; */
    /* top: 0; */
    background-color: white;
  }
</style>
