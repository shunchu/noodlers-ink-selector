<template>
  <tr>
    <td class="text-left">{{ ink.name | capitalize }}</td>
    <td>{{ ink.stockNo }}</td>
    <td>{{ ink.colors | arrayToString }}</td>
    <td>
      <i :class="ink.uvResistant | setCssClasses" :title="ink.uvResistant | capitalize | boolToString" data-toggle="tooltip"></i>
    </td>
    <td>
      <i :class="ink.archival | setCssClasses" :title="ink.archival | capitalize | boolToString"></i>
    </td>
    <td>
      <i :class="ink.tamperProof | setCssClasses" :title="ink.tamperProof | capitalize | boolToString"></i>
    </td>
    <td>
      <i :class="ink.waterproof | setCssClasses" :title="ink.waterproof | capitalize | boolToString"></i>
    </td>
    <td>
      <i :class="ink.fluorescent | setCssClasses" :title="ink.fluorescent | capitalize | boolToString"></i>
    </td>
    <td>
      <i :class="ink.lubricated | setCssClasses" :title="ink.lubricated | capitalize | boolToString"></i>
    </td>
    <td>
      <i :class="ink.freezeResistant | setCssClasses" :title="ink.freezeResistant | capitalize | boolToString"></i>
    </td>
    <td>
      <i :class="ink.exclusive | setCssClasses" :title="ink.exclusive | capitalize | boolToString"></i>
    </td>
    <td class="text-left">{{ ink.notes }}</td>
  </tr>
</template>


<script>
export default {
  name: 'ink-row',
  props: ['ink'],
  data () {
    return {}
  },

  filters: {
    arrayToString: function(arr) {
      return arr.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(', ');
    },
    boolToString: function (word) {
      if (word.toLowerCase() === 'true') {
        return 'Yes'
      } else if (word.toLowerCase() === 'false') {
        return 'No'
      } else {
        return word
      }
    },
    capitalize: function (word) {
      const wordStr = word.toString()
      return wordStr && wordStr.length > 0 ? `${wordStr.charAt(0).toUpperCase()}${wordStr.slice(1)}` : wordStr
    },
    setCssClasses: function (inkProp) {
      if (inkProp === 'partial') {
        return 'icon-contrast text-info'
      }

      return inkProp ? 'icon-checkmark text-success' : 'icon-cross text-danger'
    }
  }
}
</script>


<style scoped>
tr td { font-size: 0.8rem; }
</style>
