<script setup lang="ts">
import { Message } from '@/lib/primevue';
import { storeToRefs } from 'pinia';
import { useConfigStore } from '@/store';

// Store
const { getConfig } = storeToRefs(useConfigStore());
</script>
<template>
  <Message
    v-if="getConfig?.notificationBanner"
    severity="warn"
  >
    {{ getConfig?.notificationBanner }}
  </Message>
  <h2>What is this all about?</h2>

  <p class="mt-6">
    We're here to tell you about the AI Form Assistant, an innovative solution designed to enhance your form-filling
    experience using artificial intelligence. The Form Assistant is part of the Common AI Services initiative, helping
    program areas leverage AI.
  </p>
  <h3>What does the Form Assistant do?</h3>
  <ul>
    <li>Guide people through completion of a webform</li>
    <li>Provide a conversational interface for completing a webform</li>
    <li>Offer AI-powered suggestions and auto-completions</li>
    <li>Integrate with external data and tools</li>
  </ul>

  <router-link
    to="/demo"
    class="primary"
  >
    Try the demo
  </router-link>
</template>
