import { Container } from "../../atoms/container";
import { Heading1, Heading2 } from "../../atoms/headings";
import Row from "../../atoms/row";
import styled, { css } from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import Button from "../../atoms/button";
import { AiOutlineSmile as GetStartedButtonIcon } from 'react-icons/ai'
import { Ngos } from "../../../types/ngo";

const NgoWrapper = styled.a`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 0.5rem 0;
    position: relative;
    text-decoration: none;
    justify-content: flex-start;
    align-items: center;
    width: 132px;
`

const NgoLogoWrapper = styled.div`
    ${({ theme }) => css`
        border-radius: 50%;
        height: 8.25rem;
        width: 8.25rem;
        overflow: hidden;
        position: relative;
        box-shadow: ${theme.shadow.large};

        @media (max-width: 480px){
            height: 6rem;
            width: 6rem;
        }
    `}
`

const NgoName = styled.p`
    ${({ theme }) => css`
        color: ${theme.colors.black.light};
        text-align: center;
        font-weight: 600;
    `}
`

interface NgosWithUs {
    orgsData: Ngos
}

export default function NgosWithUs({ orgsData }: NgosWithUs) {
    return (
        <Container style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--sp-400) 0',
            alignItems: 'center'
        }}>
            <Heading2 style={{ textAlign: 'center' }}>Some organisations with us</Heading2>
            <Row style={{
                gap: '4rem',
                justifyContent: 'center',
                marginTop: '2rem'
            }}>
                {orgsData.ngos.map((orgData, index) => (
                    <Link key={index} href={`/ngo/${orgData.ngoSlug}`} passHref>
                        <NgoWrapper target='__blank'>
                            <NgoLogoWrapper>
                                <Image src={orgData.image?.src} alt={`${orgData?.title} logo`} layout='fill' />
                            </NgoLogoWrapper>
                            <NgoName>{orgData?.title}</NgoName>
                        </NgoWrapper>
                    </Link>
                ))}
            </Row>
            <Link href='/donate' passHref>
                <a style={{ marginTop: '2rem' }}>
                    <Button iconStart={<GetStartedButtonIcon />}>
                        Get started
                    </Button>
                </a>
            </Link>
        </Container>
    )
}