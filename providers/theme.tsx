import { DefaultTheme, ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styles/base'

// Styled theme
const theme: DefaultTheme = {
    colors: {
        primary: {
            light: '#5db980',
            normal: '#34a760',
            dark: '#2a864d'
        },
        secondary: {
            light: '#5d83b9',
            normal: '#3464a7',
            dark: '#2a5086'
        },
        background: {
            light: '#fdfdfd',
            normal: '#F4f7f7',
            dark: '#dcdede'
        },
        mark: {
            light: '#2f3030',
            normal: '#181919',
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
    }
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