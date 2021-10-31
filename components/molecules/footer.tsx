import styled, { css } from 'styled-components'

const StyledFooter = styled.footer`
    ${({ theme }) => (css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 10vh;
        height: max-content;
        background-color: ${theme.colors.primary.light};
        padding: var(--sp-300) var(--sp-400);

        & * {
            color: #fff;
        }
    `)}
`

export default function Footer() {
    return (
        <StyledFooter>
            <p>
                CharityCMS - We are making a change, are you?
            </p>
        </StyledFooter>
    )
}