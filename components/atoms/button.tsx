import styled, { css } from "styled-components"
import { IconType } from 'react-icons'
import { ReactNode } from 'react'
import { VariadicProps, InlineStyled } from "../../types/comps"

// Interface for button
interface IButton extends InlineStyled {
    variant?: 'primary' | 'secondary'
    buttonProps?: VariadicProps
    small?: boolean
    iconEnd?: IconType
    iconStart?: IconType
    children?: ReactNode
}

const StyledButton = styled.button<IButton>`
    ${({ theme, variant, small }) => (css`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0 0.5rem;
        padding: ${small ? 'var(--sp-200) var(--sp-400)' : 'var(--sp-300) var(--sp-500)'};
        background-color: ${variant === 'primary' ? theme.colors.primary.main : theme.colors.secondary.main};
        border-radius: ${theme.borderRadius.small}px;
        color: #fff;
        font-weight: 500;
        cursor: pointer;
        box-shadow: 0 0 4px ${theme.colors.black.light};
        font-size: ${small ? '0.9rem' : '1rem'};

        &:hover {
            background-color: ${variant === 'primary' ? theme.colors.primary.light : theme.colors.secondary.light};
        }

        &:active {
            background-color: ${variant === 'primary' ? theme.colors.primary.dark : theme.colors.secondary.dark};
            box-shadow: 0 0 8px ${theme.colors.secondary.light};
        }

        & svg {
            width: ${small ? '1.2rem' : '1.4rem'};
            height: ${small ? '1.2rem' : '1.4rem'};
            stroke: #fff;
            color: #fff;
            fill: #fff;
        }
    `)}
`

export default function Button({ children, variant = 'primary', buttonProps, small = false, iconEnd, iconStart, style }: IButton) {
    return (
        <StyledButton {...buttonProps} variant={variant} small={small} style={style}>
            {iconStart}
            {children}
            {iconEnd}
        </StyledButton>
    )
}