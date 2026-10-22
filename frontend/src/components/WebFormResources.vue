<script setup>
import { ref } from 'vue';
import { Dialog } from '@/lib/primevue';
import formDefinition from '@/assets/aifa/formDefinition.json';
import promptTemplate from '@/assets/aifa/promptTemplate.txt?raw';
import calculationRates from '@/assets/aifa/calculationRates.json';

const isDataSourcesVisible = ref(false);
const isFormDefinitionVisible = ref(false);
const isPromptTemplateVisible = ref(false);
const isFeeCalculationVisible = ref(false);
</script>
<template>
  <aside
    class="resources-panel"
    aria-labelledby="resources-title"
  >
    <h2
      id="resources-title"
      class="resources-title"
    >
      Service Configuration
    </h2>
    <div class="flex flex-col gap-2">
      <h6>Retrieval-Augmented Generation (RAG)</h6>

      <button
        type="button"
        class="btn btn-secondary w-full justify-start"
        @click="isDataSourcesVisible = true"
      >
        <i
          class="pi pi-database"
          aria-hidden="true"
        />
        Data Sources
      </button>

      <h6>Form Support Agent resources</h6>

      <button
        type="button"
        class="btn btn-secondary w-full justify-start"
        @click="isFormDefinitionVisible = true"
      >
        <i
          class="pi pi-list"
          aria-hidden="true"
        />
        Form Definition
      </button>
      <button
        type="button"
        class="btn btn-secondary w-full justify-start"
        @click="isPromptTemplateVisible = true"
      >
        <i
          class="pi pi-comment"
          aria-hidden="true"
        />
        Prompt Template
      </button>

      <h6>MCP Tool</h6>

      <button
        type="button"
        class="btn btn-secondary w-full justify-start"
        @click="isFeeCalculationVisible = true"
      >
        <i
          class="pi pi-calculator"
          aria-hidden="true"
        />
        Fee Calculation
      </button>
    </div>

    <Dialog
      v-model:visible="isDataSourcesVisible"
      header="Data Sources"
      modal
      dismissable-mask
      :style="{ width: '40rem' }"
    >
      <p class="m-0">The Assistant is trained on text from the following data sources:</p>
      <ul>
        <li>
          Webpages:
          <ul>
            <li>
              <a
                target="_blank"
                href="https://www2.gov.bc.ca/gov/content/sports-culture/recreation/fishing-hunting/fishing/recreational-freshwater-fishing-licence"
              >
                Recreational Freshwater Fishing Licence
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www2.gov.bc.ca/gov/content/sports-culture/recreation/fishing-hunting/fishing/recreational-freshwater-fishing-licence/classified-waters-licences"
              >
                Classified Waters Licences
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www2.gov.bc.ca/gov/content/sports-culture/recreation/fishing-hunting/fishing/recreational-freshwater-fishing-licence/conservation-surcharges"
              >
                Conservation Surcharges
              </a>
            </li>
          </ul>
        </li>
        <li>
          Documents:
          <ul>
            <li>
              <a
                target="_blank"
                href="https://www2.gov.bc.ca/assets/gov/sports-recreation-arts-and-culture/recreation/fishing-hunting/fishing/freshwater-fishing-regulations-summary.pdf"
              >
                Freshwater Fishing Regulations Summary (PDF)
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </Dialog>

    <Dialog
      v-model:visible="isFormDefinitionVisible"
      header="Form Definition"
      modal
      dismissable-mask
      :style="{ width: '40rem' }"
    >
      <p class="m-0">
        A JSON Form Definition informs the
        <strong>Form Support Agent</strong>
        about your webform's structure. The JSON can be enriched with additional context for each form field, provides a
        mapping to AI prompts and is used by JavaScript to update the webform.
      </p>
      <pre><code>{{ JSON.stringify(formDefinition, null, 2) }}</code></pre>
    </Dialog>

    <Dialog
      v-model:visible="isPromptTemplateVisible"
      header="Prompt Template"
      modal
      dismissable-mask
      :style="{ width: '40rem' }"
    >
      <p class="m-0">
        A Prompt Template is a text file that contains the instructions and guidelines for how the AI Form-Assistant
        should generate responses. It often includes placeholders for dynamic content, such as form data or user input,
        and is used to ensure that the Assistant's responses are relevant, accurate, and consistent with the desired
        tone.
      </p>
      <pre><code>{{ promptTemplate }}</code></pre>
    </Dialog>

    <Dialog
      v-model:visible="isFeeCalculationVisible"
      header="MCP Tool - Fee Calculation"
      modal
      dismissable-mask
      :style="{ width: '40rem', overflowX: 'auto' }"
    >
      <!-- Prettier would move the period after the link onto its own line, which renders as a space before it -->
      <!-- prettier-ignore -->
      <p class="m-0">
        The MCP Tool is a fee calculation tool that calculates the total cost of a fishing licence based on the selected
        options in the webform. The JSON below shows inputs to the calculation. More sample code can be seen
        <a
          href="https://github.com/bcgov/nr-ai-form/tree/dev-commonservices/agentic_ai_backend/agents/formsupportagent/local_mcp/fishing_licence"
          target="_blank"
          rel="noopener noreferrer"
        >here</a>.
      </p>
      <pre><code>{{ JSON.stringify(calculationRates, null, 2) }}</code></pre>
    </Dialog>
  </aside>
</template>

<style scoped>
.resources-panel {
  padding: var(--bcds-layout-padding-large);
  border: var(--bcds-layout-border-width-small) solid var(--bc-border);
  border-radius: var(--bcds-layout-border-radius-medium);
  background-color: var(--bc-surface-light);

  h6 {
    font-size: var(--bcds-typography-font-size-body);
  }
}

/* Heading 2 for the page outline, sized down to fit the sidebar */
.resources-title {
  margin: 0 0 var(--bcds-layout-margin-medium);
  font-size: var(--bcds-typography-font-size-h5);
  line-height: var(--bcds-typography-line-heights-dense);
}
</style>
