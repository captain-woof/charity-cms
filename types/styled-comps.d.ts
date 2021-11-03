import 'styled-components';

// Necessary interfaces
interface IColor {
    light: string
    main: string
    dark: string
}

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: IColor
            secondary: IColor
            white: IColor
            black: IColor
            success: IColor
            error: IColor
        }
        font: {
            family: {
                primary: string
                secondary: string
                serif: string
            }
            baseSize: number
            lineHeight: {
                min: number
                max: number
            }
        }
        borderRadius: {
            small: number
            medium: number
            large: number
        }
        shadow: {
            small: string
            medium: string
            large: string
        }
        transition: (arg0: string) => ({
            slow: string
            normal: string
            fast: string
        })
    }
}

