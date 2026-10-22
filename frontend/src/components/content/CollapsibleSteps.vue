<template>
  <!-- role="list" keeps list semantics in Safari, which drops them with list-style: none -->
  <ol
    class="collapsible-steps mt-4 list-none space-y-2 p-0"
    role="list"
  >
    <slot />
  </ol>
</template>

<style scoped>
/* Each CollapsibleStep increments this counter to number its badge */
.collapsible-steps {
  counter-reset: collapsible-step;
}
</style>
