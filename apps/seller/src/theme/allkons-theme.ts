import type { ThemeConfig } from 'antd';

/**
 * Allkons Design System - Ant Design Theme Configuration
 * 
 * This theme binds CSS variables from the 3-layer token system to Ant Design components.
 * Token mapping priority: Mapped -> Alias -> Primitive
 * 
 * All values use CSS var() to reference the design tokens loaded from:
 * - 01-primitive.css (raw hex values)
 * - 02-alias.css (semantic families)
 * - 03-mapped-light.css (component/system tokens)
 */

export const allkonsTheme: ThemeConfig = {
    token: {
        // Primary Brand Color
        colorPrimary: 'var(--background-brand-default)', // #00AF43 (Special Green)

        // Text Colors
        colorText: 'var(--text-primary)', // Primary text
        colorTextSecondary: 'var(--text-secondary)', // Secondary text
        colorTextTertiary: 'var(--text-tertiary)', // Tertiary text
        colorTextQuaternary: 'var(--text-quaternary)', // Quaternary text
        colorTextDisabled: 'var(--text-disabled)', // Disabled text
        colorTextPlaceholder: 'var(--text-placeholder)', // Placeholder text

        // Background Colors
        colorBgBase: 'var(--background-primary)', // Base background (white)
        colorBgContainer: 'var(--background-primary)', // Container background
        colorBgElevated: 'var(--background-primary)', // Elevated background
        colorBgLayout: 'var(--background-secondary)', // Layout background
        colorBgSpotlight: 'var(--background-secondary)', // Spotlight background

        // Border Colors
        colorBorder: 'var(--border-primary)', // Primary border
        colorBorderSecondary: 'var(--border-secondary)', // Secondary border

        // Success Colors
        colorSuccess: 'var(--background-success-default)', // Success color
        colorSuccessBg: 'var(--background-success-subtle)', // Success background
        colorSuccessBorder: 'var(--border-success-default)', // Success border
        colorSuccessText: 'var(--text-success-default)', // Success text

        // Warning Colors
        colorWarning: 'var(--background-warning-default)', // Warning color
        colorWarningBg: 'var(--background-warning-subtle)', // Warning background
        colorWarningBorder: 'var(--border-warning-default)', // Warning border
        colorWarningText: 'var(--text-warning-default)', // Warning text

        // Error Colors
        colorError: 'var(--background-error-default)', // Error color
        colorErrorBg: 'var(--background-error-subtle)', // Error background
        colorErrorBorder: 'var(--border-error-default)', // Error border
        colorErrorText: 'var(--text-error-default)', // Error text

        // Info Colors
        colorInfo: 'var(--background-info-default)', // Info color
        colorInfoBg: 'var(--background-info-subtle)', // Info background
        colorInfoBorder: 'var(--border-info-default)', // Info border
        colorInfoText: 'var(--text-info-default)', // Info text

        // Typography
        fontFamily: "var(--font-family-primary)",
        fontSize: 16, // Base size (--size-md)
        // @ts-ignore - Ant Design tokens accept strings for var() resolution in modern versions
        fontSizeHeading1: 'var(--size-11xl)' as any,
        // @ts-ignore
        fontSizeHeading2: 'var(--size-9xl)' as any,
        // @ts-ignore
        fontSizeHeading3: 'var(--size-6xl)' as any,
        // @ts-ignore
        fontSizeHeading4: 'var(--size-4xl)' as any,
        // @ts-ignore
        fontSizeHeading5: 'var(--size-2xl)' as any,

        // Link Colors
        colorLink: 'var(--color-link)',
        colorLinkHover: 'var(--color-link-hover)',

        // Border Radius
        borderRadius: 8, // --radius-sm
        borderRadiusLG: 12, // --radius-md
        borderRadiusSM: 4, // --radius-xs

        // Control Heights
        controlHeight: 40,
        controlHeightLG: 48,
        controlHeightSM: 32,

        // Shadows
        boxShadow: 'var(--shadow-sm)',
        boxShadowSecondary: 'var(--shadow-md)',
        boxShadowTertiary: 'var(--shadow-lg)',
    },

    components: {
        // Button Component
        Button: {
            // Primary Button (Brand)
            colorPrimary: 'var(--component-button-primary-brand-background)',
            colorPrimaryHover: 'var(--component-button-primary-brand-background-hover)',
            colorPrimaryActive: 'var(--component-button-primary-brand-background-hover)',
            colorPrimaryBorder: 'var(--component-button-primary-brand-border)',
            primaryColor: 'var(--component-button-primary-brand-text)',

            // Default Button
            defaultBorderColor: 'var(--component-button-secondary-neutral-border)',
            defaultColor: 'var(--component-button-secondary-neutral-text)',
            defaultBg: 'var(--component-button-secondary-neutral-background)',

            // Danger Button
            colorError: 'var(--component-button-primary-error-background)',
            colorErrorHover: 'var(--component-button-primary-error-background-hover)',
            colorErrorActive: 'var(--component-button-primary-error-background-hover)',
            dangerColor: 'var(--component-button-primary-error-text)',

            // Disabled State
            colorBgContainerDisabled: 'var(--component-button-primary-brand-background-disbled)',
            colorTextDisabled: 'var(--component-button-primary-brand-text-disbled)',
            borderColorDisabled: 'var(--component-button-primary-brand-border-disbled)',
        },

        // Input Component
        Input: {
            colorBorder: 'var(--component-input-brand-border)',
            colorBgContainer: 'var(--component-input-brand-background)',
            colorText: 'var(--text-primary)',
            colorTextPlaceholder: 'var(--text-placeholder)',
            colorTextDisabled: 'var(--text-disabled)',
            colorBgContainerDisabled: 'var(--component-input-brand-background-disabled)',

            // Hover State
            hoverBorderColor: 'var(--component-input-brand-border-hover)',

            // Active/Focus State
            activeBorderColor: 'var(--component-input-brand-border-active)',
            activeShadow: `0 0 0 2px var(--background-brand-subtle)`,

            // Error State
            colorError: 'var(--border-error-default)',
            colorErrorHover: 'var(--border-error-subtle)',
            errorActiveShadow: `0 0 0 2px var(--background-error-subtle)`,

            // Disabled State
            colorBorderDisabled: 'var(--component-input-brand-border-disabled)',
        },

        // Select Component
        Select: {
            colorBorder: 'var(--component-input-brand-border)',
            colorPrimary: 'var(--background-brand-default)',
            colorPrimaryHover: 'var(--component-input-brand-border-hover)',
        },

        // Checkbox Component
        Checkbox: {
            colorPrimary: 'var(--background-brand-default)',
            colorPrimaryHover: 'var(--background-brand-darker)',
            colorBorder: 'var(--border-secondary)',
        },

        // Radio Component
        Radio: {
            colorPrimary: 'var(--background-brand-default)',
            colorPrimaryHover: 'var(--background-brand-default)', // No darker on hover as per reference
            colorBorder: 'var(--border-secondary)',
            dotSize: 10, // Base dot size for Ant Design fallback
        },

        // Switch Component
        Switch: {
            colorPrimary: 'var(--background-brand-default)',
            colorPrimaryHover: 'var(--background-brand-darker)',
            colorTextQuaternary: 'var(--border-secondary)',
        },

        // Card Component
        Card: {
            colorBorderSecondary: 'var(--border-primary)',
            colorBgContainer: 'var(--background-primary)',
        },

        // Table Component
        Table: {
            headerBg: 'var(--background-secondary)',
            headerColor: 'var(--text-primary)',
            borderColor: 'var(--border-primary)',
            rowHoverBg: 'var(--background-primary-hover-alt)',
        },

        // Modal Component
        Modal: {
            contentBg: 'var(--background-primary)',
            headerBg: 'var(--background-primary)',
        },

        // Message/Notification
        Message: {
            contentBg: 'var(--background-primary)',
        },

        // Form Component
        Form: {
            labelColor: 'var(--text-primary)',
        },

        // Breadcrumb Component
        Breadcrumb: {
            linkColor: 'var(--component-breadcrumb-brand-text)',
            linkHoverColor: 'var(--component-breadcrumb-brand-text-hover)',
            itemColor: 'var(--component-breadcrumb-brand-text-active)',
        },
    },
};
