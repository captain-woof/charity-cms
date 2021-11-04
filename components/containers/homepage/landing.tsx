import ChangingImages from "../../atoms/changing-images"
import { Container } from "../../atoms/container"
import styled, { css, useTheme } from "styled-components"
import { Heading1, Heading3, Heading5 } from "../../atoms/headings"
import Button from "../../atoms/button"
import { Link } from "../../atoms/link"

// Sidebar
const Sidebar = styled.main`
    ${({ theme }) => css`
        z-index: 2;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 45%;
        min-width: 420px;
        display: flex;
        justify-content: center;
        align-items: center;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            opacity: 0.7;
            background-color: ${theme.colors.black.dark};
        }

        @media (max-width: 480px){
            inset: 0;
            width: 100%;
            min-width: unset;
        }
    `}
`

const SidebarContents = styled.div`
    position: relative;
    padding: 0 var(--sp-700);
    display: flex;
    flex-direction: column;

    @media (max-width: 480px){
        text-align: center;
        padding: 0 var(--sp-500);
    }
`

const ButtonRow = styled.div`
    gap: 0 1rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    @media (max-width: 480px){
        justify-content: center;
    }
`

const images = [
    "/api/imageproxy?url=https://unsplash.it/1600/900",
    "/api/imageproxy?url=https://unsplash.it/1280/720",
    "/api/imageproxy?url=https://unsplash.it/1366/768",
]

export default function Landing() {
    const theme = useTheme()
    return (
        <Container>
            <ChangingImages style={{ position: 'absolute', inset: 0, zIndex: 1 }} images={images} altPrefix="Landing page image" />
            <Sidebar>
                <SidebarContents>
                    <Heading1 style={{ color: '#fff', fontWeight: 600 }}>Their life is cruel</Heading1>
                    <Heading3 style={{ color: '#fff', fontWeight: 600 }}>But you can help.</Heading3>
                    <ButtonRow>
                        <Link href="/#know-how">
                            <Button style={{ backgroundColor: theme.colors.white.light, color: theme.colors.black.dark }}>Learn how</Button>
                        </Link>
                        <Link href="/donate">
                            <Button style={{ backgroundColor: theme.colors.primary.dark }}>Donate</Button>
                        </Link>
                    </ButtonRow>
                </SidebarContents>
            </Sidebar>
        </Container >
    )
}