import styled, { css } from 'styled-components'
import { Heading5 } from "../../atoms/headings"

// For a single stat
interface StatBox {
    title: string
    stat: string
}

export const StatBox = ({ stat, title }: StatBox) => {
    return (
        <StatBoxContainer>
            <Heading5 style={{
                color: "#ffffff",
                fontWeight: 600,
                textAlign: "center",
                wordBreak: "keep-all"
            }}>
                {title}
            </Heading5>

            <Heading5 style={{
                color: "#ffffff",
                fontWeight: 500,
                textAlign: "center",
                wordBreak: "keep-all"
            }}>
                {stat}
            </Heading5>
        </StatBoxContainer>
    )
}

// Styles
const StatBoxContainer = styled.figure`
    ${({ theme }) => css`
        background-color: ${theme.colors.primary.main};
        padding: var(--sp-300);
        border-radius: ${theme.borderRadius.small}px;
        color: ${theme.colors.white.light} !important;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 256px;
        min-height: 100px;
        flex-basis: 0;
        flex-grow: 1;

        @media (max-width: 480px){
            min-width: unset;
        }
    `}
`