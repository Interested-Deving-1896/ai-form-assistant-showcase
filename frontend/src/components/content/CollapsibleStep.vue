<script setup lang="ts">
// Use inside CollapsibleSteps, which numbers the steps. The default slot takes any HTML, such as paragraphs and links.
defineProps<{
  title: string;
}>();
</script>

<template>
  <li class="collapsible-step">
    <details class="rounded border border-[var(--bc-border)] bg-white">
      <summary class="flex cursor-pointer items-center gap-3 p-3 font-bold text-[var(--bc-text)]">
        <!-- The list announces each step's number, so the visible badge is hidden from screen readers -->
        <span
          class="collapsible-step-number flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
          aria-hidden="true"
        />
        <span class="grow">{{ title }}</span>
        <i
          class="pi pi-chevron-down collapsible-step-chevron"
          aria-hidden="true"
        />
      </summary>
      <!-- Indented to line up with the title, past the number badge; the slot's outer margins are trimmed -->
      <div class="pr-3 pb-3 pl-14 text-[var(--bc-text)] [&>:first-child]:mt-0 [&>:last-child]:mb-0">
        <slot />
      </div>
    </details>
  </li>
</template>

<style lang="scss" scoped>
// Counter is reset by CollapsibleSteps
.collapsible-step {
  counter-increment: collapsible-step;
}

.collapsible-step-number::before {
  content: counter(collapsible-step);
}

// Replace the browser's disclosure triangle with the chevron, which flips when the step is open
summary {
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }
}

details[open] .collapsible-step-chevron {
  transform: rotate(180deg);
}

.collapsible-step-chevron {
  transition: transform 200ms;

  @media (prefers-reduced-motion) {
    transition: none;
  }
}
</style>
