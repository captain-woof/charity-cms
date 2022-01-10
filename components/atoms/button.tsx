import styled, { css } from "styled-components"
import { IconType } from 'react-icons'
import { BiDonateHeart } from 'react-icons/bi'
import { ReactNode, useCallback, useState } from 'react'
import { VariadicProps, InlineStyled } from "../../types/comps"
import { Ngo } from "../../types/ngo"
import { makeDonation } from "../../lib/razorpay"
import Textfield from "./textfield"

// Interface for button
interface IButton extends InlineStyled {
    variant?: 'primary' | 'secondary'
    buttonProps?: VariadicProps
    small?: boolean
    iconEnd?: ReactNode
    iconStart?: ReactNode
    children?: ReactNode
    disabled?: boolean
}

const StyledButton = styled.button<IButton>`
    ${({ theme, variant, small, disabled }) => (css`
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
        font-size: ${small ? '0.9rem' : '1rem'};
        word-break: keep-all;

        ${disabled && css`
            background-color: ${variant === 'primary' ? theme.colors.primary.light : theme.colors.secondary.light};
            opacity: 0.8;
            cursor: not-allowed;
        `}

        &:hover {
            background-color: ${variant === 'primary' ? theme.colors.primary.light : theme.colors.secondary.light};
        }

        &:active {
            background-color: ${variant === 'primary' ? theme.colors.primary.dark : theme.colors.secondary.dark};
        }

        & svg {
            width: ${small ? '1.2rem' : '1.4rem'};
            height: ${small ? '1.2rem' : '1.4rem'};
            stroke: #fff;
            color: #fff;
            fill: #fff;
        }

        @media (max-width: 480px){
            padding: var(--sp-300);
            & svg {
                width: ${small ? '0.85rem' : '1rem'};
                height: ${small ? '0.85rem' : '1rem'};
            }
        }
    `)}
`

export default function Button({ children, variant = 'primary', buttonProps, small = false, iconEnd, iconStart, style, disabled }: IButton) {
    return (
        <StyledButton {...buttonProps} variant={variant} small={small} style={style} disabled={disabled}>
            {iconStart}
            {children}
            {iconEnd}
        </StyledButton>
    )
}

// Donate button
interface DonateButton extends IButton {
    ngo: Ngo
}

export function DonateButton({ children, variant = 'primary', buttonProps, small = false, style, disabled, ngo }: DonateButton) {
    const [showInput, setShowInput] = useState<boolean>(false)
    const [amount, setAmount] = useState<string>("")

    const toggleShowInput = useCallback(() => {
        setShowInput((prev) => !prev)
    }, [setShowInput])

    return (
        <>
            {showInput ?
                <form onSubmit={() => { makeDonation(ngo, amount); toggleShowInput() }}
                    style={{ width: "100%", maxWidth: "240px" }}>
                    <Textfield name="amount" label="Amount" inputProps={{
                        type: "number",
                        value: amount,
                        onChange: (e) => { setAmount(e.target.value) },
                        step: 50
                    }} />
                </form> :
                <StyledButton {...buttonProps} variant={variant} small={small} style={style} disabled={disabled} onClick={toggleShowInput}>
                    {children}
                    <BiDonateHeart />
                </StyledButton>
            }
        </>
    )
}