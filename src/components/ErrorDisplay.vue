<template>
  <div
    v-if="error"
    class="p-4 mb-4 bg-red-50/95 border border-red-200/80 rounded-lg text-red-700/90 text-sm"
  >
    <div class="flex items-center gap-2">
      <i class="i-fw i-ant-design:i-exclamation-circle-filled text-red-600/90"></i>
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
@media (max-width: 768px) {
  .p-4 {
    padding: 1.25rem 0.75rem !important;
  }
  .text-sm {
    font-size: 1rem !important;
  }
  i {
    font-size: 1.5em;
    min-width: 2em;
    min-height: 2em;
  }
}
</style>
