import type { ThemeConfig } from 'antd';
import { designTokens } from './tokens';

export const antdTheme: ThemeConfig = {
    token: {
        // Color Tokens
        colorPrimary: designTokens.colors.primary.main,
        colorError: designTokens.colors.error.main,
        colorSuccess: designTokens.colors.primary.main,
        colorWarning: '#FFA726',
        colorInfo: '#29B6F6',

        // Typography
        fontFamily: designTokens.typography.fontFamily,
        fontSize: 16,
        fontSizeHeading1: 30,
        fontSizeHeading2: 24,
        fontSizeHeading3: 20,
        fontSizeHeading4: 18,
        fontSizeHeading5: 16,

        // Border Radius
        borderRadius: 6,
        borderRadiusLG: 8,
        borderRadiusSM: 4,

        // Spacing
        padding: 16,
        paddingLG: 24,
        paddingSM: 12,
        paddingXS: 8,

        // Control Heights
        controlHeight: 40,
        controlHeightLG: 48,
        controlHeightSM: 32,

        // Line Height
        lineHeight: 1.5,
        lineHeightHeading: 1.2,
    },

    components: {
        // Input Component
        Input: {
            colorBorder: designTokens.colors.neutral.gray300,
            colorBgContainer: '#FFFFFF',
            colorText: designTokens.colors.text.primary,
            colorTextPlaceholder: designTokens.colors.text.placeholder,
            colorTextDisabled: designTokens.colors.text.disabled,
            colorBgContainerDisabled: designTokens.colors.neutral.gray100,

            // Hover state
            hoverBorderColor: designTokens.colors.primary.main,

            // Active/Focus state
            activeBorderColor: designTokens.colors.primary.main,
            activeShadow: `0 0 0 2px ${designTokens.colors.primary.light}`,

            // Error state
            errorActiveShadow: `0 0 0 2px ${designTokens.colors.error.light}`,

            // Sizes
            paddingBlock: 8,
            paddingBlockLG: 12,
            paddingBlockSM: 4,
            paddingInline: 12,
            paddingInlineLG: 16,
            paddingInlineSM: 11,
        },

        // Button Component
        Button: {
            primaryColor: '#FFFFFF',
            colorPrimary: designTokens.colors.primary.main,
            colorPrimaryHover: designTokens.colors.primary.hover,
            colorPrimaryActive: designTokens.colors.primary.active,

            defaultBorderColor: designTokens.colors.neutral.gray300,
            defaultColor: designTokens.colors.text.primary,
            defaultBg: '#FFFFFF',

            dangerColor: '#FFFFFF',
            colorError: designTokens.colors.error.main,
            colorErrorHover: designTokens.colors.error.hover,
            colorErrorActive: designTokens.colors.error.active,

            // Sizes
            controlHeight: 40,
            controlHeightLG: 48,
            controlHeightSM: 32,

            paddingInline: 20,
            paddingInlineLG: 24,
            paddingInlineSM: 15,

            fontWeight: 500,
            borderRadius: 6,
            borderRadiusLG: 8,
            borderRadiusSM: 4,
        },

        // Checkbox Component
        Checkbox: {
            colorPrimary: designTokens.colors.primary.main,
            colorPrimaryHover: designTokens.colors.primary.hover,
            colorBorder: designTokens.colors.neutral.gray400,
            borderRadiusSM: 4,
            controlInteractiveSize: 20,
        },

        // Radio Component
        Radio: {
            colorPrimary: designTokens.colors.primary.main,
            colorPrimaryHover: designTokens.colors.primary.hover,
            colorBorder: designTokens.colors.neutral.gray400,
            dotSize: 10,
            radioSize: 20,
        },

        // Switch Component
        Switch: {
            colorPrimary: designTokens.colors.primary.main,
            colorPrimaryHover: designTokens.colors.primary.hover,
            colorTextQuaternary: designTokens.colors.neutral.gray300,
            handleSize: 18,
            trackHeight: 22,
            trackMinWidth: 44,
            innerMinMargin: 2,
            innerMaxMargin: 24,
        },

        // Select Component
        Select: {
            colorBorder: designTokens.colors.neutral.gray300,
            colorPrimary: designTokens.colors.primary.main,
            colorPrimaryHover: designTokens.colors.primary.hover,
            controlHeight: 40,
            controlHeightLG: 48,
            controlHeightSM: 32,
            borderRadius: 6,
        },

        // Card Component
        Card: {
            borderRadiusLG: 12,
            boxShadowTertiary: designTokens.shadows.md,
            paddingLG: 24,
        },

        // Table Component
        Table: {
            headerBg: designTokens.colors.neutral.gray50,
            headerColor: designTokens.colors.text.primary,
            borderColor: designTokens.colors.neutral.gray200,
            rowHoverBg: designTokens.colors.primary.lighter,
        },

        // Modal Component
        Modal: {
            borderRadiusLG: 12,
            paddingContentHorizontalLG: 24,
            paddingMD: 24,
        },

        // Form Component
        Form: {
            labelColor: designTokens.colors.text.primary,
            labelFontSize: 14,
            labelHeight: 32,
            verticalLabelPadding: '0 0 8px',
        },

        // Message/Notification
        Message: {
            contentBg: '#FFFFFF',
            borderRadiusLG: 8,
        },
    },
};
