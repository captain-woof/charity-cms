import { ChildrenProp, InlineStyled } from "../../types/comps";
import styled, { css } from 'styled-components'

interface SectionBox extends InlineStyled, ChildrenProp { }

export default function SectionBox({ children, style }: SectionBox) {
    return (
        <StyledSection style={style}>
            {children}
        </StyledSection>
    )
}

// Stylings
const StyledSection = styled.section`
    ${({ theme }) => css`
        padding: var(--sp-400);
        border-radius: ${theme.borderRadius.medium}px;
        border: 2px solid ${theme.colors.primary.main}
    `}
`