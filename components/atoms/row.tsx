import styled, { css } from 'styled-components'
import { ChildrenProp, InlineStyled } from '../../types/comps'

interface IRow extends ChildrenProp, InlineStyled{
    wrap?: boolean
    hCenter?: boolean
    vCenter?: boolean
}

const StyledRow = styled.div<{$wrap: boolean, hCenter: boolean, vCenter: boolean}>`
    ${({ $wrap, hCenter, vCenter }) => css`
        display: flex;
        flex-direction: row;
        flex-wrap: ${$wrap ? 'wrap' : 'nowrap'};
        height: max-content;
        justify-content: ${hCenter ? 'center' : 'auto'};
        align-items: ${vCenter ? 'center' : 'auto'};
    `}
`

export default function Row({ children, wrap = true, style, hCenter = false, vCenter = false }: IRow) {
    return (
        <StyledRow $wrap={wrap} style={style} vCenter={vCenter} hCenter={hCenter}>
            {children}
        </StyledRow>
    )
}