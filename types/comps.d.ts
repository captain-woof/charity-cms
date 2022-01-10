import { ReactNode, CSSProperties } from 'react'

export interface VariadicProps {
    [key: string]: string | number | ((...args: any) => any)
}

export interface VariadicPropsWithoutFunc {
    [key: string]: string | number
}

export interface ChildrenProp {
    children?: ReactNode
}

export interface InlineStyled {
    style?: CSSProperties & { [key: string]: string | number }
}

export interface ClassNamed {
    className?: string
}

export interface Id {
    id?: string
}