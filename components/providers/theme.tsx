import { DefaultTheme, ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../../styles/base'

// Styled theme
const theme: DefaultTheme = {
    colors: {
        primary: {
            light: '#5db980',
            main: '#34a760',
            dark: '#2a864d'
        },
        secondary: {
            light: '#5d83b9',
            main: '#3464a7',
            dark: '#2a5086'
        },
        white: {
            light: '#fdfdfd',
            main: '#F4f7f7',
            dark: '#dcdede'
        },
        black: {
            light: '#2f3030',
            main: '#181919',
            dark: '#0e0f0f'
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
        small: '0 0 6px #181919',
        medium: '0 0 12px #181919',
        large: '0 0 24px #181919'
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