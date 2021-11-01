import { ReactNode } from 'react'

export interface VariadicProps {
    [key: string]: string | number | ((...args: any) => any)
}

export interface ChildrenProp {
    children?: ReactNode
}

export interface InlineStyled {
    style?: { [key: string]: string | number }
}

export interface ClassNamed {
    className?: string
}