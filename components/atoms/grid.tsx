import styled, { css } from 'styled-components'
import { ChildrenProp, InlineStyled } from '../../types/comps'

interface IGrid extends ChildrenProp, InlineStyled {
    direction?: 'row' | 'column'
    wrap?: boolean
}

const GridWrapper = styled.div<IGrid>`
    ${({ direction, wrap }) => css`
        display: flex;
        flex-direction: ${direction};
        flex-wrap: ${wrap ? 'wrap' : 'nowrap'};
        position: relative;
        width: 100%;
        gap: var(--sp-500);
        ${direction === 'row'
            ? css`justify-content: flex-start;`
            : css`align-items: flex-start;`
        }

        @media (max-width: 480px){
            & {
                ${direction === 'row'
                    ? css`justify-content: center;`
                    : css`align-items: center;`
                }
            }
        }
    `}
`

export default function Grid({ direction = 'row', children, wrap = false, style }: IGrid) {
    return (
        <GridWrapper direction={direction} wrap={wrap} style={style}>
            {children}
        </GridWrapper>
    )
}