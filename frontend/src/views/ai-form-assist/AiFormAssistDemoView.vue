<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';

import DemoDisclaimerBanner from '@/components/DemoDisclaimerBanner.vue';
import WebForm from '@/components/WebForm.vue';
import WebFormResources from '@/components/WebFormResources.vue';
import { useConfigStore } from '@/store';

// Set per environment via FRONTEND_AIFAS_CLIENT_SRC
const AIFAS_CLIENT_SRC: string | undefined = useConfigStore().getConfig?.aifasClientSrc;

/**
 * @function getChatWidget
 * The client script appends its chat widget to <body> once and never removes it,
 * so it would otherwise stay on every page after leaving the demo.
 * @returns {HTMLElement | undefined} The widget container, if the client script has loaded
 */
function getChatWidget(): HTMLElement | undefined {
  const container = document.getElementById('wp-chat-modal')?.parentElement;
  return container?.parentElement === document.body ? container : undefined;
}

onBeforeUnmount(() => {
  const widget = getChatWidget();
  if (widget) widget.style.display = 'none';
});

onMounted(() => {
  // Re-show the widget when returning to the demo; the already-loaded script won't run again
  getChatWidget()?.style.removeProperty('display');

  if (!AIFAS_CLIENT_SRC) {
    // eslint-disable-next-line no-console
    console.error('AI Form Assistant client source is not configured (FRONTEND_AIFAS_CLIENT_SRC)');
    return;
  }

  if (!document.querySelector(`script[src="${AIFAS_CLIENT_SRC}"]`)) {
    const script = document.createElement('script');
    script.src = AIFAS_CLIENT_SRC;
    script.type = 'module';
    document.head.appendChild(script);
  }
});
</script>

<template>
  <div ai-mode>
    <div class="full-bleed -mt-6">
      <DemoDisclaimerBanner />
    </div>

    <div class="pb-30">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-8">
          <WebForm />
        </div>
        <div class="col-span-3 col-start-10 mt-22">
          <WebFormResources />
        </div>
      </div>
    </div>
  </div>
</template>
