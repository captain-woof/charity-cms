import styled, { css } from "styled-components"
import { ChildrenProp, ClassNamed, InlineStyled } from "../../types/comps"

interface ISidebar extends ChildrenProp, InlineStyled, ClassNamed {}

const StyledSidebar = styled.aside<ISidebar>`
    ${({ theme }) => css`
        position: sticky;
        top: 0;
        left: 0;
        height: max-content;
        min-width: 320px;
        width: 320px;
        border-right: 4px solid ${theme.colors.primary.main};
        background-color: ${theme.colors.white.light};
        padding: var(--sp-500);

        @media (max-width: 768px){
            width: 235px;
            min-width: 235px;
        }

        @media (max-width: 480px){
            & {
                min-width: 100%;
                position: fixed;
                height: 30vh;
                overflow-y: auto;
                bottom: 0;
                left: 0;
                top: unset;
                box-shadow: 0 -4px 8px ${theme.colors.secondary.light};
                width: 100%;
                border-right: none;                
                border-radius: 36px 36px 0 0;
            }
        }
    `}
`

export default function Sidebar({ children, style }: ISidebar) {
    return (
        <StyledSidebar className='sidebar' style={style}>
            {children}
        </StyledSidebar>
    )
}