import { ChildrenProp, InlineStyled } from "../../types/comps";
import styled, { css } from "styled-components";

const StyledParagraph = styled.p`
    ${({ theme }) => css`
        margin: var(--sp-200) 0;
    `}
`

interface IParagraph extends InlineStyled, ChildrenProp { }

export default function Paragraph({ children, style }: IParagraph) {
    return (
        <StyledParagraph style={style} className='paragraph'>
            {children}
        </StyledParagraph>
    )
}