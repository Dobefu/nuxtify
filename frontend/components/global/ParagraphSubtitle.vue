<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <h3 class="text-2xl font-semibold">
    {{ title }}
  </h3>
</template>
