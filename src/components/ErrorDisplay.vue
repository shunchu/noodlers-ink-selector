<template>
  <div 
    v-if="error" 
    class="p-4 mb-4 bg-red-50/95 border border-red-200/80 rounded-lg text-red-700/90 text-sm"
  >
    <div class="flex items-center gap-2">
      <i class="fas fa-exclamation-circle text-red-600/90"></i>
      <span>{{ error }}</span>
    </div>
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
