<script setup lang="ts">
defineProps<{
  steps: Array<{ title: string; description: string }>;
}>();
</script>

<template>
  <ol class="mt-6 list-none space-y-4 p-0">
    <li
      v-for="(step, index) in steps"
      :key="step.title"
      class="flex gap-4"
    >
      <span
        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] font-bold text-white"
        aria-hidden="true"
      >
        {{ index + 1 }}
      </span>
      <div>
        <strong class="text-[var(--bc-text)]">{{ step.title }}</strong>
        <p class="mt-1 mb-0 text-[var(--bc-text)]">{{ step.description }}</p>
      </div>
    </li>
  </ol>
</template>
