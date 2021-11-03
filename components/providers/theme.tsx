import { DefaultTheme, ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../../styles/base'

// Styled theme
const theme: DefaultTheme = {
    colors: {
        primary: {
            light: '#51abcb',
            main: '#2596be',
            dark: '#1e7898'
        },
        secondary: {
            light: '#cb7151',
            main: '#be4d25',
            dark: '#983e1e'
        },
        white: {
            light: '#fdfdfd',
            main: '#F4f7f7',
            dark: '#dcdede'
        },
        black: {
            light: '#5e5e5e',
            main: '#181919',
            dark: '#0e0f0f'
        },
        success: {
            light: '#82ad81',
            main: '#639961',
            dark: '#4f7a4e'
        },
        error: {
            light: '#e5545d',
            main: '#df2935',
            dark: '#b2212a'
        }
    },
    font: {
        family: {
            primary: "'Nunito Sans', sans-serif",
            secondary: "'Raleway', sans-serif"
        },
        baseSize: 16,
        lineHeight: {
            min: 1.2,
            max: 1.333
        }
    },
    borderRadius: {
        small: 4,
        medium: 6,
        large: 12
    },
    shadow: {
        small: '0 2px 4px #b8b8b8',
        medium: '0 0 12px #b8b8b8',
        large: '0 0 24px #b8b8b8'
    },
    transition: (effect) => ({
        slow: `${effect} 1s ease-in-out`,
        normal: `${effect} 0.5s ease-in-out`,
        fast: `${effect} 0.35s ease-in-out`
    })
}

// Provider
export default function StyledThemeProvider({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle theme={theme} />
            {children}
        </ThemeProvider>
    )
}