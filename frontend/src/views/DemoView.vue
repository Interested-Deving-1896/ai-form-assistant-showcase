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
  // ----- link to AI Form Assistant client.js -----
  //const AIFAS_CLIENT_SRC = 'https://aiformclient-drfvhdfzascbfkh5.a01.azurefd.net/scripts/tenants/fish/client.js';
  const AIFAS_CLIENT_SRC = '/aifas-client-scripts/client.js';
  const exists = Array.from(document.head.querySelectorAll('script')).some((script) => script.src === AIFAS_CLIENT_SRC);
  if (!exists) {
    const script = document.createElement('script');
    script.src = AIFAS_CLIENT_SRC;
    script.async = true;
    document.head.appendChild(script);
  }
});
</script>

<template>
  <Message
    v-if="getConfig?.notificationBanner"
    severity="warn"
  >
    {{ getConfig?.notificationBanner }}
  </Message>

  <WebForm />

  <div class="flex flex-col api-test">
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
