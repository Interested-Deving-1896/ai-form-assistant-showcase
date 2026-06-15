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
    <main class="my-6 mx-6 lg:mx-16 flex-auto">
      <slot name="main" />
    </main>

    <!-- Footer -->
    <footer class="flex-shrink-0">
      <Footer />
    </footer>
  </div>
</template>
