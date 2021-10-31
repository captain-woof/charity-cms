import styled, { css } from 'styled-components'
import { ChildrenProp } from '../../types/comps'

const StyledHighlight = styled.span`
    ${({ theme }) => css`
        color: ${theme.colors.primary.main};
    `}
`

export default function Highlight({ children }: ChildrenProp) {
    return (
        <StyledHighlight>
            {children}
        </StyledHighlight>
    )
}