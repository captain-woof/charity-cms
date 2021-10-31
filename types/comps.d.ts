import { ReactNode } from 'react'

export interface VariadicProps {
    [key: string]: string | number
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