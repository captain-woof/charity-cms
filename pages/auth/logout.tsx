import styled, { css, useTheme } from 'styled-components'
import { Container } from '../../components/atoms/container'
import { CgSpinnerAlt } from 'react-icons/cg'
import Row from '../../components/atoms/row'
import { useRouter } from 'next/router'
import { useSignOut } from '../../hooks/auth'
import { useEffect } from 'react'

const Spinner = styled(CgSpinnerAlt)`
    ${({ theme }) => css`
        width: 1.5rem;
        height: 1.5rem;
        
        @keyframes rotate {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        animation: rotate 1s linear infinite;

        & > path {
            fill: ${theme.colors.primary.main};
        }
    `}
`

export default function Logout() {
    const theme = useTheme()
    const router = useRouter()
    const { signOut, success } = useSignOut()

    useEffect(() => {
        (async () => {
            await signOut()
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (success) {
            router.push('/')
        }
    }, [success, router])

    return (
        <Container style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: theme.colors.black.light
        }}>
            <Row style={{ gap: '0 0.5rem' }}>
                <Spinner />
                <span>Logging out</span>
            </Row>
        </Container>
    )
}