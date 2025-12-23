<script setup lang="ts">
import { Message } from '@/lib/primevue';
import { storeToRefs } from 'pinia';
import { useConfigStore } from '@/store';

// Store
const { getConfig } = storeToRefs(useConfigStore());
</script>
<template>
  <Message v-if="getConfig?.notificationBanner" severity="warn">
    {{ getConfig?.notificationBanner }}
  </Message>
  <h1 class="font-bold">AI Form Assistant Showcase</h1>
</template>
