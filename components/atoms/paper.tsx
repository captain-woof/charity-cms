import styled, { css } from 'styled-components'
import { ChildrenProp, InlineStyled } from '../../types/comps'

interface IPaper extends ChildrenProp, InlineStyled {
    raiseOnHover?: boolean
    border?: boolean
    borderRadius?: boolean
    id?: string
}

const StyledPaper = styled.div<IPaper>`
    ${({ theme, raiseOnHover, border, borderRadius }) => (css`
        padding: var(--sp-400) var(--sp-400);
        background-color: ${theme.colors.white.light};
        position: relative;

        ${borderRadius && css`
            border-radius: 12px;
        `}
        
        ${border && css`
            border: 1.8px solid ${theme.colors.primary.main};
            &:hover {
                border: 2px solid ${theme.colors.primary.dark};
            }
        `}

        &::after {
                content: '';
                display: block;
                position: absolute;
                z-index: -1;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background-color: ${theme.colors.black.main};
                transform: translateY(0.4rem);
                filter: blur(0.25rem);
                opacity: 0.25;
        }
        
        ${raiseOnHover && css`
            &::after {
                transition: ${theme.transition('opacity').normal};
            }
            &:hover::after{
                opacity: 0.75;
            }
        `}
    `)}
`

export default function Paper({ children, raiseOnHover = false, border = false, borderRadius = false, style, id }: IPaper) {
    return (
        <StyledPaper raiseOnHover={raiseOnHover} border={border} borderRadius={borderRadius}
            style={style} id={id} className='paper'>
            {children}
        </StyledPaper>
    )
}