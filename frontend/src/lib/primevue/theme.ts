import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

// Shared focus outline from the BC Design System
const focusRing = {
  width: '2px',
  style: 'solid',
  color: 'var(--bcds-surface-color-border-active)',
  offset: '2px',
  shadow: 'none'
};

/**
 * Builds the toast colours for one severity from the BC Design System support colours
 * @param {string} support The support colour name in @bcgov/design-tokens (info, success, warning or danger)
 * @returns {object} PrimeVue toast colour tokens
 */
function toastColors(support: string) {
  return {
    background: `var(--bcds-support-surface-color-${support})`,
    borderColor: `var(--bcds-support-border-color-${support})`,
    color: 'var(--bcds-typography-color-primary)',
    detailColor: 'var(--bcds-typography-color-primary)',
    shadow: 'var(--bcds-surface-shadow-medium)',
    closeButton: {
      hoverBackground: 'var(--bcds-surface-color-tertiary-hover)',
      focusRing: { color: 'var(--bcds-surface-color-border-active)', shadow: 'none' }
    }
  };
}

/**
 * PrimeVue theme matching the BC Design System
 * Values reference the CSS variables from @bcgov/design-tokens, which main.ts loads
 * @see https://www2.gov.bc.ca/gov/content/digital/design-system
 */
export const BCGovPreset = definePreset(Aura, {
  primitive: {
    borderRadius: {
      none: '0',
      xs: 'var(--bcds-layout-border-radius-small)',
      sm: 'var(--bcds-layout-border-radius-small)',
      md: 'var(--bcds-layout-border-radius-medium)',
      lg: 'var(--bcds-layout-border-radius-medium)',
      xl: 'var(--bcds-layout-border-radius-large)'
    }
  },
  semantic: {
    // BC blue scale, lightest to darkest
    primary: {
      50: 'var(--bcds-theme-blue-10)',
      100: 'var(--bcds-theme-blue-20)',
      200: 'var(--bcds-theme-blue-30)',
      300: 'var(--bcds-theme-blue-40)',
      400: 'var(--bcds-theme-blue-60)',
      500: 'var(--bcds-theme-blue-70)',
      600: 'var(--bcds-theme-blue-80)',
      700: 'var(--bcds-theme-blue-90)',
      800: 'var(--bcds-theme-blue-100)',
      900: 'var(--bcds-surface-color-primary-pressed)',
      950: 'var(--bcds-surface-color-primary-pressed)'
    },
    focusRing,
    formField: {
      paddingX: '0.75rem',
      paddingY: 'var(--bcds-layout-padding-small)',
      borderRadius: 'var(--bcds-layout-border-radius-medium)',
      focusRing
    },
    overlay: {
      select: { shadow: 'var(--bcds-surface-shadow-medium)' },
      popover: { shadow: 'var(--bcds-surface-shadow-medium)' },
      modal: {
        borderRadius: 'var(--bcds-layout-border-radius-medium)',
        padding: 'var(--bcds-layout-padding-large)',
        shadow: 'var(--bcds-surface-shadow-large)'
      },
      navigation: { shadow: 'var(--bcds-surface-shadow-medium)' }
    },
    colorScheme: {
      light: {
        surface: {
          0: 'var(--bcds-theme-gray-white)',
          50: 'var(--bcds-theme-gray-10)',
          100: 'var(--bcds-theme-gray-20)',
          200: 'var(--bcds-theme-gray-30)',
          300: 'var(--bcds-theme-gray-40)',
          400: 'var(--bcds-theme-gray-60)',
          500: 'var(--bcds-theme-gray-70)',
          600: 'var(--bcds-theme-gray-80)',
          700: 'var(--bcds-theme-gray-90)',
          800: 'var(--bcds-theme-gray-100)',
          900: 'var(--bcds-theme-gray-110)',
          950: 'var(--bcds-theme-gray-110)'
        },
        primary: {
          color: 'var(--bcds-surface-color-primary-default)',
          contrastColor: 'var(--bcds-typography-color-primary-invert)',
          hoverColor: 'var(--bcds-surface-color-primary-hover)',
          activeColor: 'var(--bcds-surface-color-primary-pressed)'
        },
        mask: {
          background: 'var(--bcds-surface-color-overlay-default)'
        },
        formField: {
          background: 'var(--bcds-surface-color-forms-default)',
          disabledBackground: 'var(--bcds-surface-color-forms-disabled)',
          borderColor: 'var(--bcds-surface-color-border-default)',
          hoverBorderColor: 'var(--bcds-surface-color-border-dark)',
          focusBorderColor: 'var(--bcds-surface-color-border-active)',
          invalidBorderColor: 'var(--bcds-support-border-color-danger)',
          color: 'var(--bcds-typography-color-primary)',
          disabledColor: 'var(--bcds-typography-color-disabled)',
          placeholderColor: 'var(--bcds-typography-color-placeholder)',
          iconColor: 'var(--bcds-icons-color-primary)'
        },
        text: {
          color: 'var(--bcds-typography-color-primary)',
          hoverColor: 'var(--bcds-typography-color-primary)',
          mutedColor: 'var(--bcds-typography-color-secondary)',
          hoverMutedColor: 'var(--bcds-typography-color-primary)'
        },
        content: {
          borderColor: 'var(--bcds-surface-color-border-default)',
          hoverBackground: 'var(--bcds-surface-color-menus-hover)'
        },
        overlay: {
          modal: { borderColor: 'var(--bcds-surface-color-border-default)' },
          popover: { borderColor: 'var(--bcds-surface-color-border-default)' },
          select: { borderColor: 'var(--bcds-surface-color-border-default)' }
        }
      }
    }
  },
  components: {
    dialog: {
      header: { padding: 'var(--bcds-layout-padding-medium) var(--bcds-layout-padding-large)' },
      title: { fontSize: 'var(--bcds-typography-font-size-h5)', fontWeight: 'var(--bcds-typography-font-weights-bold)' },
      content: { padding: 'var(--bcds-layout-padding-medium) var(--bcds-layout-padding-large)' },
      footer: { padding: 'var(--bcds-layout-padding-medium) var(--bcds-layout-padding-large)' }
    },
    toast: {
      summary: { fontWeight: 'var(--bcds-typography-font-weights-bold)' },
      detail: { fontWeight: 'var(--bcds-typography-font-weights-regular)' },
      colorScheme: {
        light: {
          info: toastColors('info'),
          success: toastColors('success'),
          warn: toastColors('warning'),
          error: toastColors('danger')
        }
      }
    },
    tooltip: {
      root: {
        padding: 'var(--bcds-layout-padding-xsmall) var(--bcds-layout-padding-small)',
        borderRadius: 'var(--bcds-layout-border-radius-medium)',
        shadow: 'var(--bcds-surface-shadow-small)'
      },
      colorScheme: {
        light: {
          root: {
            background: 'var(--bcds-theme-gray-110)',
            color: 'var(--bcds-typography-color-primary-invert)'
          }
        }
      }
    }
  }
});
