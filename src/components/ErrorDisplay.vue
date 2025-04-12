<template>
  <div 
    v-if="error" 
    class="fixed bottom-5 right-5 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded shadow-lg"
    role="alert"
  >
    <p class="font-bold">Error:</p>
    <p>{{ error }}</p>
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
/* Removed the original styles as they are no longer needed with the updated Tailwind classes */
</style>
