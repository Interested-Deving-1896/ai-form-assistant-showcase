<script setup lang="ts">
import { ProgressSpinner } from '@/lib/primevue';
</script>

<template>
  <ProgressSpinner
    style="width: 3.125rem; height: 3.125rem"
    stroke-width="4"
  />
</template>

<style lang="scss" scoped>
:deep(.p-progress-spinner-circle) {
  stroke: var(--bc-blue) !important;
}
</style>
