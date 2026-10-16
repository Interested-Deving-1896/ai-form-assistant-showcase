<script setup lang="ts">
import { storeToRefs } from 'pinia';

import architectureDiagram from '@/assets/images/ai-form-assist-architecture.jpg';
import { CalloutSection, DiagramFigure, FeatureCard, PageHero, ProcessSteps } from '@/components/content';
import { useAuthStore } from '@/store';
import { RouteNames } from '@/utils/constants';

const { getIsAuthenticated } = storeToRefs(useAuthStore());

const capabilities = [
  {
    icon: 'bolt',
    title: 'Real-Time Guidance',
    description: 'Provides plain-language explanations and answers while users complete forms.'
  },
  {
    icon: 'check-circle',
    title: 'Smart Validation',
    description: 'Identifies gaps, inconsistencies, and missing information before submission.'
  },
  {
    icon: 'cog',
    title: 'Automated Logic',
    description: 'Supports calculations, conditional workflows, and scenario-based guidance.'
  },
  {
    icon: 'shield',
    title: 'Policy-Based Assistance',
    description: 'Delivers responses grounded in approved program content and business rules.'
  },
  {
    icon: 'user',
    title: 'Context-Aware Support',
    description: 'Offers relevant suggestions and pre-fill capabilities based on user inputs.'
  },
  {
    icon: 'sitemap',
    title: 'Multi-Agent Architecture',
    description: 'A multi-tenant framework of specialized AI agents, shown in the architecture below.'
  }
];

const howItWorks = [
  {
    title: 'The assistant loads in your form',
    description:
      'The web form adds a small client script, which places the chat assistant on the page and tracks which form step the applicant is on.'
  },
  {
    title: 'Your tenant is verified',
    description:
      'The AI Form Assist API looks up your client profile in Azure Cosmos DB and only accepts requests from your approved web addresses.'
  },
  {
    title: 'The question is routed',
    description:
      'The Orchestrator Agent works out what the applicant is asking about on the current step and chooses which specialized agents should respond.'
  },
  {
    title: 'Specialized agents respond',
    description:
      "The Conversation Agent answers from approved program content using Azure AI Search. The Form Support Agent uses the step's form definition, prompts and tools, such as a fee calculator, to explain fields and suggest values."
  },
  {
    title: 'One clear answer',
    description:
      'The responses are combined into a single answer. Suggested values can be filled into the form, and the conversation is kept for the session.'
  }
];

const programAreas = [
  'Land Authorizations',
  'Mining Permits',
  'Habitat & Wildlife Permits',
  'Forestry & Range Authorizations',
  'Transportation Permits',
  'Environmental Assessments',
  'Online Forms & Digital Intake Services'
];
</script>

<template>
  <div class="w-full max-w-[75rem]">
    <PageHero title="AI Form Assist">
      Helping people complete government applications with confidence through AI-powered guidance, while improving
      submission quality and reducing administrative effort across ministries.
      <template #actions>
        <router-link
          :to="{ name: RouteNames.AI_FORM_ASSIST_DEMO }"
          class="btn btn-primary"
        >
          Try the Demo
          <template v-if="!getIsAuthenticated">
            <i
              class="pi pi-lock"
              aria-hidden="true"
            />
            <span class="sr-only">(login required)</span>
          </template>
        </router-link>
        <router-link
          :to="{ name: RouteNames.AI_FORM_ASSIST_ONBOARDING }"
          class="btn btn-secondary"
        >
          Onboarding
        </router-link>
      </template>
    </PageHero>

    <section class="border-t border-[var(--bc-border)] py-4">
      <h2>What It Is</h2>
      <p class="mt-2 text-[var(--bc-text)]">
        AI Form Assist is a reusable, multi-agent AI service that helps applicants complete complex government forms and
        permit applications. Developed as a common service through CSBC, it adds an intelligent assistant to
        e-permitting solutions, online forms, and legacy platforms without requiring major system changes.
      </p>
      <p class="mt-4 text-[var(--bc-text)]">
        The assistant provides real-time, policy-informed guidance and validation throughout the application, helping
        applicants submit higher-quality applications while reducing support demands on government staff.
      </p>
    </section>

    <section class="border-t border-[var(--bc-border)] py-4">
      <h2>Key Capabilities</h2>
      <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          v-for="capability in capabilities"
          :key="capability.title"
          :icon="capability.icon"
          :title="capability.title"
        >
          {{ capability.description }}
        </FeatureCard>
      </div>
    </section>

    <section class="border-t border-[var(--bc-border)] py-4">
      <h2>How It Works</h2>
      <ProcessSteps :steps="howItWorks" />
    </section>

    <section
      id="architecture"
      class="border-t border-[var(--bc-border)] py-4"
    >
      <h2>Architecture</h2>
      <p class="mt-2 text-[var(--bc-text)]">
        Requests from client web applications go through a public API to the Orchestrator Agent, which routes them to
        specialized agents. Each tenant's client profile defines its approved web addresses, enabled agents, prompts,
        knowledge index, and form definitions, so programs share one platform while keeping their configuration and
        content separate.
      </p>
      <DiagramFigure
        :src="architectureDiagram"
        alt="AI Form Assist architecture"
        caption="High-level architecture showing the public API, the Orchestrator and specialized agents, tenant client
          profiles, the knowledge index, and prompts and form definitions in Blob Storage."
      />
    </section>

    <section class="border-t border-[var(--bc-border)] py-4">
      <h2>Built for Cross-Government Adoption</h2>
      <p class="mt-2 text-[var(--bc-text)]">
        AI Form Assist is designed as a reusable platform that can support a wide range of government programs and
        permitting processes.
      </p>
      <div class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="area in programAreas"
          :key="area"
          class="inline-flex min-h-8 items-center rounded-full border border-[var(--bcds-support-border-color-info)] bg-[var(--bcds-support-surface-color-info)] px-4 text-xs"
        >
          {{ area }}
        </span>
      </div>
    </section>

    <CalloutSection title="Is AI Form Assist a Good Fit for Your Program?">
      <p class="mt-2 text-[var(--bc-text)]">See what you'll need and how onboarding works.</p>
      <router-link
        :to="{ name: RouteNames.AI_FORM_ASSIST_ONBOARDING }"
        class="btn btn-primary mt-4"
      >
        Onboarding
      </router-link>
    </CalloutSection>
  </div>
</template>
