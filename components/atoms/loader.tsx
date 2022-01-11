import styled, { css } from 'styled-components'
import { BiLoaderAlt } from "react-icons/bi"

export default function Loader() {
    return (
        <FullPage>
            <StyledLoaderIcon />
        </FullPage>
    )
}

// Styles
const FullPage = styled.div`
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledLoaderIcon = styled(BiLoaderAlt)`
    @keyframes spin {
        0% {
            transform: rotateZ(0deg);
        }
        100% {
            transform: rotateZ(360deg);
        }
    }

    ${({ theme }) => css`
        fill: ${theme.colors.primary.main};
        animation: spin 1.125s linear infinite;
        z-index: 100;
        height: 48px;
        width: 48px;
    `}
`