<script setup lang="ts">
import multiTenantDiagram from '@/assets/images/ai-services-hub-multi-tenant.svg';
import { DiagramFigure, PageHero, ProcessSteps } from '@/components/content';

const DOCS_URL = 'https://bcgov.github.io/ai-hub-tracking/';
const ONBOARDING_PORTAL_URL = 'https://ai-hub-onboarding.azurewebsites.net';

const onboardingSteps = [
  {
    title: 'Request access',
    description:
      'Sign in to the tenant onboarding portal with your government account and describe your project: business case, data classification, contacts, and the AI services and models you need.'
  },
  {
    title: 'Review and approval',
    description: 'AI Services Hub administrators review your request, and approve it or follow up with questions.'
  },
  {
    title: 'Provisioning',
    description:
      "Your tenant's resources are created automatically through infrastructure as code. Production deployments need a final approval."
  },
  {
    title: 'Get your keys',
    description: 'Copy your API keys and endpoint details from the Credentials panel in the portal.'
  }
];
</script>

<template>
  <div class="w-full max-w-[75rem]">
    <!-- TODO(content): draft copy summarised from the ai-hub-tracking docs; review and replace as needed -->
    <PageHero title="AI Services Hub">
      A centralized, secure gateway for BC Government teams to access enterprise AI services, including Azure OpenAI
      models, Document Intelligence, PII redaction, and Speech, without exposing Azure resources to the public internet.
      <template #actions>
        <a
          :href="DOCS_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary"
        >
          Read the Docs
          <i
            class="pi pi-external-link"
            aria-hidden="true"
          />
        </a>
        <a
          :href="ONBOARDING_PORTAL_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-secondary"
        >
          Tenant Onboarding Portal
          <i
            class="pi pi-external-link"
            aria-hidden="true"
          />
        </a>
      </template>
    </PageHero>

    <section class="border-t border-[var(--bc-border)] py-4">
      <h2>Shared Platform, Dedicated Data</h2>
      <p class="mt-2 text-[var(--bc-text)]">
        Dev, test, and production each run in their own Azure subscription. Within each one, all tenants share the AI
        Foundry hub and an API Management gateway that handles authentication, token limits, PII redaction, and logging.
      </p>
      <p class="mt-4 text-[var(--bc-text)]">
        Each tenant gets its own resource group, with its own AI Foundry project and model deployments, plus optional
        Key Vault, Storage, AI Search, Cosmos DB, Document Intelligence, and Speech. All of them are reachable only
        through private endpoints.
      </p>
      <DiagramFigure
        :src="multiTenantDiagram"
        alt="Multi-tenant isolation model: shared infrastructure for all ministries, with isolated resources per ministry"
        caption="How ministries share the platform while their data stays isolated."
        href="https://bcgov.github.io/ai-hub-tracking/diagrams.html#multi-tenant"
      />
    </section>

    <section class="border-t border-[var(--bc-border)] py-4">
      <h2>Getting Onboarded</h2>
      <ProcessSteps :steps="onboardingSteps" />
      <p class="mt-6 text-[var(--bc-text)]">
        Before going to production, teams agree to engage a Privacy Analyst, notify CSBC if personal information is
        involved, and complete any required Privacy Impact Assessment (PIA) and Security Threat and Risk Assessment
        (STRA).
      </p>
      <a
        :href="ONBOARDING_PORTAL_URL"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-primary mt-2"
      >
        Go to the Onboarding Portal
        <i
          class="pi pi-external-link"
          aria-hidden="true"
        />
      </a>
    </section>
  </div>
</template>
