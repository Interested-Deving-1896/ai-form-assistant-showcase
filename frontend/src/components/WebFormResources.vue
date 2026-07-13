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
  <div class="notes-container flex flex-col gap-4">
    <h4>Client Configuration</h4>
    <button
      class="btn btn-secondary"
      @click="isDataSourcesVisible = true"
    >
      Data Sources
    </button>
    <button
      class="btn btn-secondary"
      @click="isFormDefinitionVisible = true"
    >
      Form Definition
    </button>
    <button
      class="btn btn-secondary"
      @click="isPromptTemplateVisible = true"
    >
      Prompt Template
    </button>
    <button
      class="btn btn-secondary"
      @click="isFeeCalculationVisible = true"
    >
      MCP Tool - Fee Calculation
    </button>

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
        A Form Definition (JSON schema) tells the AI Form-Assistant about the webform and data structure. It is used to
        instruct the Assistant with AI prompts and provides more 'context' for each form field.
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
      <p class="m-0">
        The MCP Tool is a fee calculation tool that calculates the total cost of a fishing licence based on the selected
        options.
      </p>
      <pre><code>{{ JSON.stringify(calculationRates, null, 2) }}</code></pre>
    </Dialog>
  </div>
</template>
