import { Heading4 } from "../../atoms/headings";
import Paper from "../../atoms/paper";
import Image from "next/image"
import { DonateButton } from "../../atoms/button";
import { Ngo } from "../../../types/ngo";
import styled from 'styled-components'
import Link from 'next/link'

interface NgoCard {
    ngo: Ngo
}

export default function NgoCard({ ngo }: NgoCard) {
    return (
        <Link passHref href={ `/ngo/${ngo.ngoSlug}` }><a>
            <Paper raiseOnHover style={{
                padding: "var(--sp-400) var(--sp-300)",
                width: "300px",
                borderRadius: "12px"
            }}>
                <ImgContainer>
                    <Image src={ngo.image.src} alt={ngo.title} layout="fill" objectFit="cover" />
                </ImgContainer>

                <Heading4>{ngo.title}</Heading4>
                
                <ActionButtonContainer>
                    <DonateButton ngo={ngo} />
                </ActionButtonContainer>
            </Paper>
        </a></Link>
    )
}

const ImgContainer = styled.div`
    width: 100%;
    height: 175px;
    position: relative;
    margin-bottom: var(--sp-200);
`

const ActionButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: var(--sp-400);
`