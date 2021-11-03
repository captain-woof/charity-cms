import styled, { css } from "styled-components";
import { InlineStyled, VariadicPropsWithoutFunc } from "../../types/comps";
import { BiErrorCircle } from 'react-icons/bi'

const ErrorWrapper = styled.div<IVariant>`
    ${({ variant, align }) => css`
        display: flex;
        flex-direction: row;
        gap: 0 0.25rem;
        width: 100%;
        position: relative;
        flex-wrap: nowrap;
        ${variant === 'normal' && css`
            align-items: center;
        `}
        ${align === 'start' && css`justify-content: flex-start;`}
        ${align === 'center' && css`justify-content: center;`}
        ${align === 'end' && css`justify-content: flex-end;`}
    `}
`

const ErrorIcon = styled(BiErrorCircle)`
    ${({ theme }) => css`
        fill: ${theme.colors.error.main};
        height: 100%;
        position: relative;
    `}
`

const ErrorText = styled.div<IVariant>`
    ${({ theme, variant }) => css`
        position: relative;
        color: ${theme.colors.error.main};
        transition: ${theme.transition('all').fast};
        font-family: ${theme.font.family.primary};
        font-size: ${variant === 'small' ? 'var(--fs-300)' : 'var(--fs-400)'};
        font-weight: 600;
        height: 100%;
        position: relative;
    `}
`;

interface IVariant {
    variant?: 'small' | 'normal'
    align?: 'start' | 'center' | 'end'
}

interface IError extends InlineStyled, IVariant {
    show?: boolean
    error?: string | boolean
    styleErrorText?: VariadicPropsWithoutFunc
    styleErrorIcon?: VariadicPropsWithoutFunc
}

export default function ErrorMessage({ show = false, error, style, styleErrorText, styleErrorIcon, variant = 'small', align = 'start' }: IError) {
    return (
        show ?
            <ErrorWrapper style={style} variant={variant} align={align}>
                <ErrorIcon style={styleErrorIcon} />
                <ErrorText aria-live='polite' style={styleErrorText} variant={variant}>{error}</ErrorText>
            </ErrorWrapper>
            : null
    )
}