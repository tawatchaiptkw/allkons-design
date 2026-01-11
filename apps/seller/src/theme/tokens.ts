// Design System Tokens based on provided design
export const designTokens = {
    // Colors
    colors: {
        primary: {
            main: '#00A651', // Green from design system
            hover: '#008F46',
            active: '#007A3D',
            light: '#E6F7EF',
            lighter: '#F0FBF5',
        },
        error: {
            main: '#E53935',
            hover: '#D32F2F',
            active: '#C62828',
            light: '#FFEBEE',
            border: '#EF5350',
        },
        neutral: {
            gray50: '#FAFAFA',
            gray100: '#F5F5F5',
            gray200: '#EEEEEE',
            gray300: '#E0E0E0',
            gray400: '#BDBDBD',
            gray500: '#9E9E9E',
            gray600: '#757575',
            gray700: '#616161',
            gray800: '#424242',
            gray900: '#212121',
        },
        text: {
            primary: '#212121',
            secondary: '#757575',
            disabled: '#BDBDBD',
            placeholder: '#9E9E9E',
        },
    },

    // Typography
    typography: {
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontSize: {
            xs: '12px',
            sm: '14px',
            base: '16px',
            lg: '18px',
            xl: '20px',
            '2xl': '24px',
            '3xl': '30px',
        },
        fontWeight: {
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
    },

    // Spacing
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
    },

    // Border Radius
    borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        full: '9999px',
    },

    // Shadows
    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },

    // Component Sizes
    sizes: {
        input: {
            small: {
                height: '32px',
                padding: '4px 11px',
                fontSize: '14px',
            },
            medium: {
                height: '40px',
                padding: '8px 12px',
                fontSize: '16px',
            },
            large: {
                height: '48px',
                padding: '12px 16px',
                fontSize: '16px',
            },
        },
        button: {
            small: {
                height: '32px',
                padding: '4px 15px',
                fontSize: '14px',
            },
            medium: {
                height: '40px',
                padding: '8px 20px',
                fontSize: '16px',
            },
            large: {
                height: '48px',
                padding: '12px 24px',
                fontSize: '16px',
            },
        },
    },
};
