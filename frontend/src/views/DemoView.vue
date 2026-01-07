<script setup lang="ts">
import { Button, Message } from '@/lib/primevue';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

import WebForm1 from '@/components/WebForm1.vue';

import { useConfigStore, useHelloStore } from '@/store';


// Store
const helloStore = useHelloStore();
const { getConfig } = storeToRefs(useConfigStore());
const { getHello } = storeToRefs(helloStore);



onMounted(() => {
  // Array of script sources
  const scriptSources = [
    '/aifas-client-scripts/Formcapture.js',
    '/aifas-client-scripts/webform1/form-context-mapping.js',
    '/aifas-client-scripts/client.js',
  ];

  // Check if scripts already exist in head before adding
  scriptSources.forEach(src => {
    const exists = Array.from(document.head.querySelectorAll('script')).some(
      script => script.src.includes(src)
    );

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

  <WebForm1 />


  <div class="flex flex-column">
    <div class="flex justify-content-center mb-5">
      <h1 class="font-bold">
        {{ getHello }}
      </h1>
    </div>
    <div class="flex justify-content-center mb-5">
      <Button @click="helloStore.helloWorld()">Make an API call!</Button>
    </div>
  </div>
</template>
<style scoped>
/* form */

form {
  max-width: 800px;
}

label {
  display: block;
  margin-top: 15px;
}

input,
select,
textarea {
  width: 50%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 2px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
}
</style>
