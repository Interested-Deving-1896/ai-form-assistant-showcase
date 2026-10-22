<script setup lang="ts">
import { LoginButton } from '@/components/layout';
</script>

<template>
  <!-- BC Design System header: https://www2.gov.bc.ca/gov/content/digital/design-system/components/header -->
  <header class="app-header">
    <div class="layout-container app-header-container">
      <ul class="app-header-skiplinks">
        <li><a href="#main-content">Skip to main content</a></li>
      </ul>
      <a
        href="https://www2.gov.bc.ca"
        class="app-header-logo -ml-4"
      >
        <img
          src="@/assets/images/bc_logo_colour.svg"
          width="175"
          height="65"
          alt="Government of British Columbia"
        />
      </a>
      <span
        class="app-header-line"
        aria-hidden="true"
      />
      <span class="app-header-title">AI Common Service</span>
      <LoginButton />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  min-height: 3.0625rem;
  padding: 0.5rem 0;
  background-color: var(--bcds-surface-color-forms-default);
  border-bottom: var(--bcds-layout-border-width-small) solid var(--bc-border);
}

.app-header-container {
  display: flex;
  flex-grow: 1;
  align-items: center;
  gap: var(--bcds-layout-padding-medium);
}

.app-header-logo {
  display: flex;
  flex-shrink: 0;

  // In rem so the logo scales with the root font size; the width and height attributes keep its aspect ratio
  img {
    width: 10.9375rem;
    height: auto;
  }
}

.app-header-line {
  flex-shrink: 0;
  width: 1px;
  height: 2.5rem;
  background-color: var(--bc-border);
}

.app-header-title {
  flex-grow: 1;
  color: var(--bc-text);
  font-size: var(--bcds-typography-font-size-h4);
  font-weight: var(--bcds-typography-font-weights-bold);
  line-height: var(--bcds-typography-line-heights-sparse);
}

// Hidden off screen until focused
.app-header-skiplinks {
  position: absolute;
  margin: 0;
  padding: 0;
  list-style: none;

  a {
    position: absolute;
    margin-top: -1.094rem;
    margin-left: -100000px;
    padding: var(--bcds-layout-padding-xsmall) var(--bcds-layout-padding-medium);
    background-color: var(--bcds-surface-color-forms-default);
    white-space: nowrap;

    &:focus {
      margin-left: 0;
    }
  }
}

@media (max-width: 575px) {
  .app-header-line,
  .app-header-title {
    display: none;
  }

  .app-header-logo {
    flex-grow: 1;
  }
}
</style>
