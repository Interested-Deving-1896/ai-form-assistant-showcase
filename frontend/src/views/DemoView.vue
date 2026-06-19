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
  // config.js sets window.AIFAS_CONFIG (ORCHESTRATOR_API_URL from the deployed ConfigMap)
  // and MUST load before client.js. In local `vite` dev it 404s (no nginx envsubst), so we
  // proceed to client.js on error too — client.js then uses its hardcoded dev fallback.
  //const AIFAS_CLIENT_SRC = 'https://aiformclient-drfvhdfzascbfkh5.a01.azurefd.net/scripts/tenants/fish/client.js';
  const AIFAS_CONFIG_SRC = '/aifas-client-scripts/config.js';
  const AIFAS_CLIENT_SRC = '/aifas-client-scripts/client.js';

  const alreadyLoaded = (src: string) =>
    Array.from(document.head.querySelectorAll('script')).some(
      (script) => script.getAttribute('src') === src
    );

  const loadScript = (src: string, onDone: () => void) => {
    if (alreadyLoaded(src)) {
      onDone();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = false; // preserve config.js -> client.js execution order
    script.onload = onDone;
    script.onerror = onDone;
    document.head.appendChild(script);
  };

  if (!alreadyLoaded(AIFAS_CLIENT_SRC)) {
    // Load config first, then client.js (runs regardless of whether config loaded).
    loadScript(AIFAS_CONFIG_SRC, () => loadScript(AIFAS_CLIENT_SRC, () => {}));
  }
});
</script>

<template>
  <div ai-mode>
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
  </div>
</template>
<style scoped>
.api-test {
  display: none !important;
}
</style>
