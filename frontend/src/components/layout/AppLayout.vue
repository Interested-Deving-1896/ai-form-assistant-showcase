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
    <main class="my-6 flex-auto">
      <div class="mx-auto w-full max-w-[1200px] px-6 lg:px-16">
        <slot name="main" />
      </div>
    </main>

    <!-- Footer -->
    <footer class="flex-shrink-0">
      <Footer />
    </footer>
  </div>
</template>
