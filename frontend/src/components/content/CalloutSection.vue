<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <section class="my-10 rounded border-l-4 border-[var(--bc-gold)] bg-[var(--bc-surface-light)] px-6 pt-2 pb-6">
    <h3>{{ title }}</h3>
    <slot />
  </section>
</template>
