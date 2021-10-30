import 'styled-components';

// Necessary interfaces
interface IColor {
    light: string
    normal: string
    dark: string
}

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: IColor
            secondary: IColor
            background: IColor
            mark: IColor
        }
        font: {
            family: {
                primary: string
                secondary: string
            }
            baseSize: number
            lineHeight: {
                min: number
                max: number
            }
        }
    }
}

