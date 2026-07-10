<script setup lang="ts">
import architectureDiagram from '@/assets/images/ai-service-architecture.jpg';
</script>
<template>
  <div class="w-full max-w-[1600px]">
    <section class="mt-4 border-l-4 border-[var(--bc-blue)] bg-[var(--bc-surface-light)] p-6">
      <h1>AI Service: Multi-Agent Platform for BC Government</h1>
      <p class="mt-4 text-lg text-[var(--bc-text-secondary)]">
        A secure, scalable AI service that enables intelligent assistance, policy-grounded guidance, and digital service
        modernization across BC Government programs, permits, and application services.
      </p>

      <p class="mt-6 text-[var(--bc-text)]">
        The AI Service is a cloud-native, multi-agent platform hosted on Microsoft Azure and designed to support
        government service delivery through conversational AI, form assistance, policy guidance, and integration with
        legacy government systems.
      </p>
      <p class="mt-4 text-[var(--bc-text)]">
        Built as a reusable common service, the platform combines specialized AI agents, secure data integration, and
        modern cloud architecture to help applicants, staff, and ministries access information, complete complex
        processes, and improve service outcomes. It is designed to integrate with existing applications without
        requiring replacement of established business systems.
      </p>
    </section>

    <section class="border-t border-[var(--bc-border)] py-6">
      <h2>Reference Architecture</h2>
      <p class="mt-6 text-[var(--bc-text)]">
        The AI Service uses a hub-and-spoke architecture where a central Orchestrator Agent coordinates specialized AI
        agents, enterprise tools, knowledge repositories, and legacy government systems. This design enables intelligent
        routing, secure integration, and scalable service delivery across multiple government programs.
      </p>
      <div
        class="mt-6 flex items-center justify-center rounded border border-dashed border-[var(--bc-border)] bg-white p-10 text-sm text-[var(--bc-text-secondary)]"
      >
        <a
          :href="architectureDiagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            :src="architectureDiagram"
            alt="AI Service Architecture"
            class="max-h-[400px] object-contain"
          />
        </a>
      </div>
    </section>

    <section class="border-t border-[var(--bc-border)] py-6">
      <h2>How It Works</h2>
      <ol class="mt-6 list-decimal space-y-2 pl-6 text-[var(--bc-text)]">
        <li>Users interact through a web application, permit portal, or digital service.</li>
        <li>Requests are securely processed through the AI Service API layer.</li>
        <li>An Orchestrator Agent analyzes intent and determines which specialized agents should respond.</li>
        <li>
          Agents access approved tools, knowledge stores, policy repositories, and government systems as required.
        </li>
        <li>Responses are aggregated into a single, user-friendly answer and returned to the application.</li>
      </ol>
    </section>

    <section class="border-t border-[var(--bc-border)] py-6">
      <h2>Core Architectural Capabilities</h2>
      <div class="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <h3>Secure by Design</h3>
          <ul class="mt-2 list-disc pl-6 text-[var(--bc-text)]">
            <li>Azure-hosted under BC Government guardrails</li>
            <li>OAuth2 and OpenID Connect integration</li>
            <li>Role and identity-aware interactions</li>
            <li>Protected network connectivity to government systems</li>
          </ul>
        </div>

        <div>
          <h3>Knowledge & Reasoning</h3>
          <ul class="mt-2 list-disc pl-6 text-[var(--bc-text)]">
            <li>Retrieval-Augmented Generation (RAG)</li>
            <li>Vector search and knowledge retrieval</li>
            <li>Policy-grounded responses</li>
            <li>Context-aware conversation management</li>
          </ul>
        </div>

        <div>
          <h3>Operations & Reliability</h3>
          <ul class="mt-2 list-disc pl-6 text-[var(--bc-text)]">
            <li>Distributed agent architecture</li>
            <li>Session and state management</li>
            <li>Telemetry and observability</li>
            <li>Scalable cloud-native deployment</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="border-t border-[var(--bc-border)] py-6">
      <h2>Specialized AI Agents</h2>
      <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-sitemap" />
            </div>
            <h4 class="m-0">Orchestrator Agent</h4>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Coordinates requests, manages routing, and combines outputs from specialized agents.
          </p>
        </div>

        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-comments" />
            </div>
            <h4 class="m-0">Conversation Agent</h4>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Handles user interactions, explanations, and information retrieval using enterprise knowledge sources.
          </p>
        </div>

        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-file-edit" />
            </div>
            <h4 class="m-0">Form Support Agent</h4>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Assists with application forms, validation, calculations, and process-specific guidance.
          </p>
        </div>

        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-book" />
            </div>
            <h4 class="m-0">Service Policy Agent</h4>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Interprets policy, regulatory requirements, and program rules to provide authoritative guidance.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
