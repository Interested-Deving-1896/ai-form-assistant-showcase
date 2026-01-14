<script setup lang="ts">
import { Button, Message } from '@/lib/primevue';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

import WebForm from '@/components/WebForm.vue';

import { useConfigStore, useHelloStore } from '@/store';

// Store
const helloStore = useHelloStore();
const { getConfig } = storeToRefs(useConfigStore());
const { getHello } = storeToRefs(helloStore);

onMounted(() => {
  // -------------- load AI Form Assistant scripts --------------
  // Array of script sources
  const scriptSources = [
    '/aifas-client-scripts/Formcapture.js',
    '/aifas-client-scripts/form-context-mapping.js',
    '/aifas-client-scripts/client.js'
  ];

  // Check if scripts already exist in head before adding
  scriptSources.forEach((src) => {
    const exists = Array.from(document.head.querySelectorAll('script')).some((script) => script.src.includes(src));

    if (!exists) {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    }
  });
});

// onUnmounted(() => {
//   alert('un');
// const scriptElements = document.getElementsByClassName('aifas');
//   if (scriptElements.length > 0) {
//     Array.from(scriptElements).forEach((scriptElement) => {
//       document.head.removeChild(scriptElement);
//     });
//   }

//   const chatbotElements = document.querySelectorAll('[id^="wp-chatbot"]');
//   chatbotElements.forEach((element) => {
//     element.remove();
//   });
// });
</script>

<template>
  <Message
    v-if="getConfig?.notificationBanner"
    severity="warn"
  >
    {{ getConfig?.notificationBanner }}
  </Message>

  <WebForm />

  <div class="flex flex-column api-test">
    <div class="flex">
      <h4 class="font-bold">
        {{ getHello }}
      </h4>
    </div>
    <div class="flex">
      <Button @click="helloStore.helloWorld()">Make an API call to backend</Button>
    </div>
  </div>
</template>
<style scoped>
.api-test {
  display: none !important;
}
</style>
