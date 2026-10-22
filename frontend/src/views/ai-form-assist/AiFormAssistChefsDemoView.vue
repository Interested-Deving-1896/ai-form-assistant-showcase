<script setup lang="ts">
import { CollapsibleStep, CollapsibleSteps, PageHero } from '@/components/content';
import chefsScreenshot from '@/assets/images/chefs_screenshot.jpg';
import DiagramFigure from '@/components/content/DiagramFigure.vue';
import { useConfigStore } from '@/store';
import { RouteNames } from '@/utils/constants';

// import ConfigService from './configService';
// const config = new ConfigService().getConfig();

// Set per environment via FRONTEND_CHEFS_DEMO_URL
const CHEFS_DEMO_URL: string | undefined = useConfigStore().getConfig?.chefsDemoUrl;

// The CHEFS tenant's files in the AI Form Assist client repo
const CHEFS_TENANT_URL = 'https://github.com/bcgov/ai-form-client/tree/main/src/tenant/chefs1';
</script>

<template>
  <div>
    <!-- <div class="full-bleed -mt-6">
      <DemoDisclaimerBanner />
    </div> -->

    <div class="w-full max-w-[75rem]">
      <PageHero title="AI Form Assist in CHEFS">
        AI Form Assist (AIFA) also works with a form built with CHEFS, the BC Government's Common Hosted Forms Service.
        Learn more about this proof of concept below.
      </PageHero>

      <!-- Side by side on large screens; the screenshot drops below the text on smaller screens -->
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 border-t border-[var(--bc-border)] lg:grid-cols-2">
        <section class="py-4">
          <h2>Proof of Concept</h2>
          <p>
            The Assistant can be successfully loaded into your CHEFS form with the easy addition of a script tag in your
            form design.
          </p>
          <p>
            Your form acts as a distinct tenant in the AI Form Assist system, with its own set of configurable AI
            resources. See:
            <router-link :to="{ name: RouteNames.AI_FORM_ASSIST_CHEFS_DEMO, hash: '#technical-integration' }">
              Technical Integration
            </router-link>
            below.
          </p>
          <p>
            The Assistant connects to a curated knowledge source, such as a set of documents or website content,
            allowing it to provide the user with relevant guidance and information based on the content of your form and
            associated materials.
          </p>
          <p>
            With additional custom javascript and manual editing of your CHEFS form schema, you can also enable the Form
            Support Agent and custom MCP tools. Please contact us to learn more about this capability.
          </p>
        </section>

        <section class="py-4">
          <DiagramFigure
            :src="chefsScreenshot"
            alt="A CHEFS fishing licence form beside the AI Form Assist chat window. A non-resident angler from Seattle asks about fishing the Fraser River for one day, and the assistant explains which licence they need."
            caption="Screenshot - the chatbot embedded into a CHEFS form"
          />
        </section>
      </div>

      <h2 id="technical-integration">Technical Integration of AI Form Assist</h2>
      <!-- TODO(content): review; drafted from the CHEFS tenant in the ai-form-client repo -->
      <!-- Prettier puts punctuation right after a link on its own line, which renders as a space, so avoid it -->
      <CollapsibleSteps>
        <CollapsibleStep title="An AIFA tenant for the CHEFS form in AIFA">
          <p>
            When you onboard as a tenant of AIFA, we register a client ID, the CHEFS web address of your webform, and
            the AI agents or tools you want to connect to.
          </p>
        </CollapsibleStep>

        <CollapsibleStep title="The AI resources">
          <ul>
            <li>A knowledge source - a set of documents or website content informing the Assistant's responses.</li>
            <li>
              a
              <a
                :href="`${CHEFS_TENANT_URL}/assets/formdefinitions/step0.json`"
                target="_blank"
                rel="noopener noreferrer"
              >
                form definition
              </a>
              (Optional - if automated form-filling is required) - a JSON schema for your webform, providing a field
              mapping and context.
            </li>
            <li>
              <a
                :href="`${CHEFS_TENANT_URL}/assets/prompttemplates/step0.md`"
                target="_blank"
                rel="noopener noreferrer"
              >
                A prompt template
              </a>
              - a set of instructions that guide the assistant on how to handle the form.
            </li>
          </ul>

          <p>
            see:
            <router-link :to="{ name: RouteNames.AI_FORM_ASSIST_ONBOARDING, hash: '#what-youll-bring' }">
              What you'll bring
            </router-link>
            for more details.
          </p>
        </CollapsibleStep>

        <CollapsibleStep title="JavaScript added to your form">
          <!-- TODO(content): explain how the script is added to the CHEFS form -->
          <p>
            To embed the Assistant in your CHEFS form, the form needs to include a script tag to fetch a custom/modified
            version of our client.js file. The script link can be added in a form component's
            <strong>Data</strong>
            (tab)
            <strong>> Custom Default Value</strong>
            in the CHEFS form builder.
          </p>
        </CollapsibleStep>

        <CollapsibleStep title="data-id HTML attributes on form fields (optional)">
          <!-- TODO(content): explain how the script is added to the CHEFS form -->
          <p>
            You can add
            <code>data-id</code>
            HTML attributes to your form fields to help the assistant identify them more reliably. This is optional but
            recommended for better form-filling accuracy.
          </p>
        </CollapsibleStep>
      </CollapsibleSteps>
      <p>
        <router-link :to="{ name: RouteNames.AI_FORM_ASSIST_ONBOARDING }">Learn about onboarding</router-link>
      </p>

      <template v-if="CHEFS_DEMO_URL">
        <a
          :href="CHEFS_DEMO_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary mb-2"
        >
          Open the CHEFS Demo
          <i
            class="pi pi-external-link"
            aria-hidden="true"
          />
        </a>
        <p class="m-0 basis-full text-sm text-[var(--bc-text-secondary)]">
          Opens in a new tab. You'll need to log in to CHEFS with your IDIR or BCeID.
        </p>
      </template>
    </div>
  </div>
</template>
