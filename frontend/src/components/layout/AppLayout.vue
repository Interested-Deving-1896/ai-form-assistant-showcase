<script setup lang="ts">
import { Header, Footer } from '@/components/layout';
</script>

<template>
  <div class="w-full min-h-screen flex flex-col">
    <!-- Header/Nav -->
    <div class="layout-head">
      <Header />
      <slot name="nav" />
    </div>

    <!-- Main views -->
    <main
      id="main-content"
      class="my-6 flex-auto"
      tabindex="-1"
    >
      <div class="layout-container">
        <slot name="main" />
      </div>
    </main>

    <!-- Footer -->
    <Footer class="flex-shrink-0" />
  </div>
</template>

<style scoped>
/* Focused programmatically by the skip link only */
#main-content:focus {
  outline: none;
}
</style>
