import styled, { css } from 'styled-components'
import { ChildrenProp, InlineStyled } from '../../types/comps'

interface IColumn extends ChildrenProp, InlineStyled{
    wrap?: boolean
    hCenter?: boolean
    vCenter?: boolean
}

const StyledColumn = styled.div<{$wrap: boolean, hCenter: boolean, vCenter: boolean}>`
    ${({ $wrap, hCenter, vCenter }) => css`
        display: flex;
        flex-direction: column;
        flex-wrap: ${$wrap ? 'wrap' : 'nowrap'};
        width: max-content;
        justify-content: ${hCenter ? 'center' : 'auto'};
        align-items: ${vCenter ? 'center' : 'auto'};
    `}
`

export default function Column({ children, wrap = true, style, hCenter = false, vCenter = false }: IColumn) {
    return (
        <StyledColumn $wrap={wrap} style={style} vCenter={vCenter} hCenter={hCenter}>
            {children}
        </StyledColumn>
    )
}