<script setup lang="ts">
import { RouteNames } from '@/utils/constants';
</script>
<template>
  <div class="w-full max-w-[1200px]">
    <section class="mt-4 border-l-4 border-[var(--bc-blue)] bg-[var(--bc-surface-light)] px-6 pt-2 pb-4">
      <h1>AI Forms-Assist</h1>
      <p class="mt-4 text-lg text-[var(--bc-text-secondary)]">
        Helping people complete government applications with confidence through AI-powered guidance, while improving
        submission quality and reducing administrative effort across ministries.
      </p>
      <router-link
        to="/demo"
        class="btn btn-primary mt-8 inline-block"
      >
        Try the Demo
      </router-link>
    </section>

    <section class="border-t border-[var(--bc-border)] py-10">
      <h3 class="mt-12">How AI Form-Assist Works</h3>
      <h6 class="m-0 text-[var(--bc-text)]">Common Service</h6>
      <p class="mt-1 text-[var(--bc-text)]">
        AI Forms-Assist is a reusable, multi-agent artificial intelligence service designed to improve how applicants
        complete complex government forms and permit applications. Developed as a Common Service through CSBC, it can be
        integrated with e-permitting solutions, online forms, and legacy platforms without requiring major system
        changes.
      </p>
      <h6 class="m-0 text-[var(--bc-text)]">Application Support</h6>
      <p class="mt-1 text-[var(--bc-text)]">
        The service provides real-time assistance, policy-informed guidance, and intelligent validation throughout the
        application process, helping users submit higher-quality applications while reducing support demands on
        government staff.
      </p>

      <h6 class="m-0 text-[var(--bc-text)]">Integration</h6>
      <p class="mt-1 text-[var(--bc-text)]">
        AI Forms-Assist acts as an intelligent layer that can be added to existing government applications and intake
        processes. Using a network of specialized AI agents, the service provides contextual support and guidance
        throughout form completion while maintaining alignment with approved policies, procedures, and program
        requirements.
        <br />
        <router-link
          :to="{ name: RouteNames.AI_FORM_ASSIST_ARCHITECTURE }"
          class="underline"
        >
          Learn more about the AI Forms-Assist architecture
          <i class="pi pi-arrow-right" />
        </router-link>
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
            <h5 class="m-0">Real-Time Guidance</h5>
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
            <h5 class="m-0">Smart Validation</h5>
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
            <h5 class="m-0">Automated Logic</h5>
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
            <h5 class="m-0">Policy-Based Assistance</h5>
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
            <h5 class="m-0">Context-Aware Support</h5>
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
            <h5 class="m-0">Multi-Agent Architecture</h5>
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
        <span class="rounded-full bg-[var(--bc-surface-hover)] px-3 py-1 text-sm font-medium text-[var(--bc-blue)]">
          Land Authorizations
        </span>
        <span class="rounded-full bg-[var(--bc-surface-hover)] px-3 py-1 text-sm font-medium text-[var(--bc-blue)]">
          Mining Permits
        </span>
        <span class="rounded-full bg-[var(--bc-surface-hover)] px-3 py-1 text-sm font-medium text-[var(--bc-blue)]">
          Habitat & Wildlife Permits
        </span>
        <span class="rounded-full bg-[var(--bc-surface-hover)] px-3 py-1 text-sm font-medium text-[var(--bc-blue)]">
          Forestry & Range Authorizations
        </span>
        <span class="rounded-full bg-[var(--bc-surface-hover)] px-3 py-1 text-sm font-medium text-[var(--bc-blue)]">
          Transportation Permits
        </span>
        <span class="rounded-full bg-[var(--bc-surface-hover)] px-3 py-1 text-sm font-medium text-[var(--bc-blue)]">
          Environmental Assessments
        </span>
        <span class="rounded-full bg-[var(--bc-surface-hover)] px-3 py-1 text-sm font-medium text-[var(--bc-blue)]">
          Online Forms & Digital Intake Services
        </span>
      </div>
    </section>

    <section class="border-t border-[var(--bc-border)] py-8">
      <h3>Is this a good fit for your program?</h3>
      <p class="mt-2 font-semibold text-[var(--bc-blue)]">AI forms-Assist may be a good fit if your program has:</p>
      <ul class="mt-4 list-disc space-y-2 pl-6 text-[var(--bc-text)]">
        <li>Complex application forms or permit processes</li>
        <li>Frequent applicant questions before submission</li>
        <li>High rates of incomplete or unclear applications</li>
        <li>Program rules that can be explained using approved guidance</li>
        <li>Staff time spent following up for missing information</li>
        <li>A need to improve applicant experience without rebuilding the full system</li>
      </ul>
      <a
        href="mailto:NRM.CommonServiceShowcase@gov.bc.ca"
        class="btn btn-primary mt-6 inline-block"
      >
        Contact us to learn more
      </a>
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
