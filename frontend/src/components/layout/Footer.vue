<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useConfigStore } from '@/store';

// Store
const { getConfig } = storeToRefs(useConfigStore());

// Default links from the BC Design System footer
const contactHref = 'https://www2.gov.bc.ca/gov/content?id=6A77C17D0CCB48F897F8598CCC019111';
const serviceCentreHref = 'https://www2.gov.bc.ca/gov/content?id=FBC4210F6BC047A5884198F543C97D53';
const moreInfoLinks = [
  { label: 'Home', href: 'https://www2.gov.bc.ca/gov/content/home' },
  { label: 'About gov.bc.ca', href: 'https://www2.gov.bc.ca/gov/content?id=3C4F47288DFB454987435AB5EFEFBB7F' },
  { label: 'Disclaimer', href: 'https://www2.gov.bc.ca/gov/content?id=79F93E018712422FBC8E674A67A70535' },
  { label: 'Privacy', href: 'https://www2.gov.bc.ca/gov/content?id=9E890E16955E4FF4BF3B0E07B4722932' },
  { label: 'Accessibility', href: 'https://www2.gov.bc.ca/gov/content?id=E08E79740F9C41B9B0C484685CC5E412' },
  { label: 'Copyright', href: 'https://www2.gov.bc.ca/gov/content?id=1AAACC9C65754E4D89A118B875E0FBDA' },
  { label: 'Contact us', href: 'https://www2.gov.bc.ca/gov/content?id=6A77C17D0CCB48F897F8598CCC019111' }
];

const currentYear = new Date().getUTCFullYear();
</script>

<template>
  <!-- BC Design System footer: https://www2.gov.bc.ca/gov/content/digital/design-system/components/footer -->
  <footer class="app-footer">
    <div class="footer-acknowledgement">
      <p class="layout-container">
        The B.C. Public Service acknowledges the territories of First Nations around B.C. and is grateful to carry out
        our work on these lands. We acknowledge the rights, interests, priorities, and concerns of all Indigenous Peoples
        — First Nations, Métis, and Inuit — respecting and acknowledging their distinct cultures, histories, rights,
        laws, and governments.
      </p>
    </div>

    <div class="footer-content">
      <div class="layout-container footer-content-container">
        <div class="footer-logo-links">
          <div class="footer-logo">
            <img
              src="@/assets/images/bc_logo_colour.svg"
              width="146"
              height="56"
              alt="Government of British Columbia"
            />
            <p>
              We can help in over 220 languages and through other accessible options.
              <a :href="contactHref" target="_blank">Call, email or text us</a>, or
              <a :href="serviceCentreHref" target="_blank">find a service centre</a>
            </p>
          </div>

          <div class="footer-links">
            <span class="footer-links-title">More info</span>
            <ul>
              <li
                v-for="link in moreInfoLinks"
                :key="link.label"
              >
                <a
                  :href="link.href"
                  target="_blank"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr />

        <div class="footer-copyright">
          <p>© {{ currentYear }} Government of British Columbia.</p>
          <p v-if="getConfig">
            v{{ getConfig.version }}{{ getConfig.gitRev ? '-' + getConfig.gitRev.substring(0, 8) : '' }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.app-footer {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.footer-acknowledgement {
  padding: var(--bcds-layout-padding-xlarge) 0;
  background-color: var(--bcds-theme-gray-110);
  border-top: var(--bcds-layout-border-width-large) solid var(--bcds-theme-gold-60);
  border-bottom: var(--bcds-layout-border-width-large) solid var(--bcds-theme-gold-60);

  p {
    margin-top: 0;
    margin-bottom: 0;
    color: var(--bcds-typography-color-primary-invert);
    font-size: var(--bcds-typography-font-size-small-body);
    line-height: var(--bcds-typography-line-heights-xxdense);
  }
}

.footer-content {
  padding: var(--bcds-layout-padding-xlarge) 0;
  background-color: var(--bc-surface-light);
}

.footer-content-container {
  display: flex;
  flex-direction: column;
  gap: var(--bcds-layout-padding-xlarge);

  p {
    margin: 0;
  }

  hr {
    width: 100%;
    height: var(--bcds-layout-border-width-small);
    margin: 0;
    border: none;
    background-color: var(--bc-border-dark);
  }
}

.footer-logo-links {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  column-gap: var(--bcds-layout-padding-xlarge);
  row-gap: var(--bcds-layout-padding-medium);
}

.footer-logo {
  display: flex;
  flex-direction: column;
  gap: var(--bcds-layout-padding-large);
  min-width: 0;
  max-width: 36rem;

  img {
    width: 9.125rem;
    height: auto;
  }

  p {
    font-size: var(--bcds-typography-font-size-small-body);
    line-height: var(--bcds-typography-line-heights-xxdense);
  }

  a {
    color: var(--bc-text-secondary);

    &:hover {
      color: var(--bc-text-secondary);
      text-decoration: none;
    }
  }
}

.footer-links {
  min-width: 20rem;

  .footer-links-title {
    display: block;
    margin-bottom: var(--bcds-layout-padding-medium);
    font-size: var(--bcds-typography-font-size-small-body);
    font-weight: var(--bcds-typography-font-weights-bold);
    line-height: var(--bcds-typography-line-heights-xxdense);
    text-transform: uppercase;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: var(--bcds-layout-padding-xlarge);
    row-gap: var(--bcds-layout-padding-small);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    font-size: var(--bcds-typography-font-size-small-body);
    line-height: var(--bcds-typography-line-heights-xxdense);
  }

  a {
    color: var(--bc-text);
    text-decoration: none;

    &:hover {
      color: var(--bc-text);
      text-decoration: underline;
    }
  }
}

.footer-copyright {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--bcds-layout-padding-medium);
  color: var(--bc-text-secondary);
}

/* Tablet: links drop beneath the logo */
@media (max-width: 991px) {
  .footer-logo-links {
    flex-wrap: wrap;
  }

  .footer-logo {
    max-width: 20.25rem;
  }
}

/* Extra small screens */
@media (max-width: 575px) {
  .footer-content {
    padding: var(--bcds-layout-padding-medium) 0;
  }

  .footer-content-container,
  .footer-logo {
    gap: var(--bcds-layout-padding-medium);
  }

  .footer-links {
    min-width: 0;
  }
}
</style>
