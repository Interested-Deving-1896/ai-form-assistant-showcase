<script setup lang="ts">
import { RouteNames } from '@/utils/constants';
</script>
<template>
  <div class="w-full max-w-[1600px]">
    <section class="mt-4 border-l-4 border-[var(--bc-blue)] bg-[var(--bc-surface-light)] p-6">
      <h1>AI Forms-Assist</h1>
      <p class="mt-4 text-lg text-[var(--bc-text-secondary)]">
        Helping people complete government applications with confidence through AI-powered guidance, while improving
        submission quality and reducing administrative effort across ministries.
      </p>
      <router-link
        to="/demo"
        class="btn btn-secondary mt-8 inline-block"
      >
        Try the Demo
      </router-link>
    </section>

    <section class="border-t border-[var(--bc-border)] py-10">
      <p class="mt-2 text-[var(--bc-text)]">
        AI Forms-Assist is a reusable, multi-agent artificial intelligence service designed to improve how applicants
        complete complex government forms and permit applications. Developed as a Common Service through CSBC, it can be
        integrated with e-permitting solutions, online forms, and legacy platforms without requiring major system
        changes.
      </p>
      <p class="mt-4 text-[var(--bc-text)]">
        The service provides real-time assistance, policy-informed guidance, and intelligent validation throughout the
        application process, helping users submit higher-quality applications while reducing support demands on
        government staff.
      </p>

      <p class="mt-6 text-[var(--bc-text)]">
        AI Forms-Assist acts as an intelligent layer that can be added to existing government applications and intake
        processes. Using a network of specialized AI agents, the service provides contextual support and guidance
        throughout form completion while maintaining alignment with approved policies, procedures, and program
        requirements.
      </p>

      <h3 class="mt-12">Key Capabilities</h3>
      <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-bolt" />
            </div>
            <h4 class="m-0">Real-Time Guidance</h4>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Provides plain-language explanations and answers while users complete forms.
          </p>
        </div>

        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-check-circle" />
            </div>
            <h4 class="m-0">Smart Validation</h4>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Identifies gaps, inconsistencies, and missing information before submission.
          </p>
        </div>

        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-cog" />
            </div>
            <h4 class="m-0">Automated Logic</h4>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Supports calculations, conditional workflows, and scenario-based guidance.
          </p>
        </div>

        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-shield" />
            </div>
            <h4 class="m-0">Policy-Based Assistance</h4>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Delivers responses grounded in approved program content and business rules.
          </p>
        </div>

        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-user" />
            </div>
            <h4 class="m-0">Context-Aware Support</h4>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Offers relevant suggestions and pre-fill capabilities based on user inputs.
          </p>
        </div>

        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-sitemap" />
            </div>
            <h4 class="m-0">Multi-Agent Architecture</h4>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            A multi-tenanted agentic framework -
            <br />
            <router-link
              :to="{ name: RouteNames.AI_FORM_ASSIST_ARCHITECTURE }"
              class=""
            >
              View the architecture
            </router-link>
            .
          </p>
        </div>
      </div>
    </section>

    <section class="border-t border-[var(--bc-border)] py-8">
      <h2>Built for Cross-Government Adoption</h2>
      <p class="mt-6 text-[var(--bc-text)]">
        AI Forms-Assist is designed as a reusable platform that can support a wide range of government programs and
        permitting processes.
      </p>
      <div class="mt-4 flex flex-wrap gap-2">
        <span class="rounded-full bg-[var(--bc-blue)] px-3 py-1 text-sm font-medium text-white">
          Land Authorizations
        </span>
        <span class="rounded-full bg-[var(--bc-blue)] px-3 py-1 text-sm font-medium text-white">Mining Permits</span>
        <span class="rounded-full bg-[var(--bc-blue)] px-3 py-1 text-sm font-medium text-white">
          Habitat & Wildlife Permits
        </span>
        <span class="rounded-full bg-[var(--bc-blue)] px-3 py-1 text-sm font-medium text-white">
          Forestry & Range Authorizations
        </span>
        <span class="rounded-full bg-[var(--bc-blue)] px-3 py-1 text-sm font-medium text-white">
          Transportation Permits
        </span>
        <span class="rounded-full bg-[var(--bc-blue)] px-3 py-1 text-sm font-medium text-white">
          Environmental Assessments
        </span>
        <span class="rounded-full bg-[var(--bc-blue)] px-3 py-1 text-sm font-medium text-white">
          Online Forms & Digital Intake Services
        </span>
      </div>
    </section>

    <section class="my-10 rounded border-l-4 border-[var(--bc-gold)] bg-[var(--bc-surface-light)] p-6">
      <h2>Looking Ahead</h2>
      <p class="mt-6 text-[var(--bc-text)]">
        The next phase of AI Forms-Assist focuses on expanding adoption, strengthening responsible AI practices, and
        growing the library of specialized agents supporting review, compliance, policy guidance, and application
        drafting.
      </p>
      <p class="mt-4 text-[var(--bc-text)]">
        As additional ministries adopt the platform, AI Forms-Assist will provide a consistent and scalable approach to
        improving digital service delivery across BC Government.
      </p>
    </section>
  </div>
</template>
