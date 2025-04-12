<template>
  <div v-if="error" class="alert alert-danger mt-3">
    <strong>Error:</strong> {{ error }}
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: String,
    default: null
  }
})
</script>

<style scoped>
.alert {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
</style>
