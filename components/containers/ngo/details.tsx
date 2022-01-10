import { Ngo } from "../../../types/ngo";
import { MaxWidthContainer } from "../../atoms/container";
import Seo from "../../atoms/seo"
import Image from "next/image"
import styled from "styled-components"
import { Heading1, Heading3, Heading5 } from "../../atoms/headings"
import Paragraph from "../../atoms/paragraph";
import { DonateButton } from "../../atoms/button";
import Footer from "../../molecules/footer";

export default function Details({ ngo }: { ngo: Ngo }) {

    return (
        <>
            <Seo description={ngo.description.slice(0, 121)} keywords={`${ngo.title}, ${ngo.category}, donate to ngo, ngo donation, charity cms`} title={ngo.title} url={`${process.env.NEXT_PUBLIC_APP_ORIGIN}/ngo/${ngo.ngoSlug}`} />
            <MaxWidthContainer>

                {/* Hero image */}
                <ImageContainer>
                    <Image src={ngo.image.src} alt={`Logo of ${ngo.title}`} layout="fill" objectFit="cover" />
                </ImageContainer>

                {/* Heading */}
                <Heading1 style={{ textAlign: "center", marginBottom: "var(--sp-100)" }}>
                    {ngo.title}
                </Heading1>

                {/* Year of establishment */}
                <Heading5 style={{ textAlign: 'center', marginBottom: "var(--sp-200)" }}>
                    Established in {ngo.yearOfEstablish}
                </Heading5>

                {/* Category */}
                <Heading3 style={{ textAlign: 'center', marginBottom: "var(--sp-300)" }}>
                    {ngo.category}
                </Heading3>

                {/* Description */}
                <main>
                    {ngo.description.split("\n").map((paragraphText, index) => (
                        <Paragraph key={index} style={{ textAlign: "justify" }}>
                            {paragraphText}
                        </Paragraph>
                    ))}
                </main>

                {/* Footer */}
                <StyledContentFooter>
                    {/* Contact */}
                    <Contact>
                        <Paragraph style={{ fontWeight: 300, fontSize: "var(--fs-300)" }}>
                            Contact
                        </Paragraph>
                        <Paragraph style={{ fontWeight: 600, marginTop: "-8px" }}>
                            {ngo.ownerName}<br/>
                            {ngo.contact}<br/>
                            <a href={`mailto:${ngo.charityEmail}`}>{ngo.charityEmail}</a>
                        </Paragraph>
                    </Contact>

                    {/* Donate button */}
                    <DonateButton ngo={ngo}>Donate</DonateButton>
                </StyledContentFooter>

            </MaxWidthContainer>
            <Footer />
        </>
    )
}

// Styles
const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 360px;
    margin-bottom: var(--sp-400);

    @media (max-width: 480px){
        & {
            height: 250px;
        }
    }
`

const StyledContentFooter = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: var(--sp-600);
    gap: var(--sp-300);

    @media (max-width: 480px) {
        flex-direction: column-reverse;
        justify-content: center;
    }
`

const Contact = styled.div`
    display: flex;
    flex-direction: column;

    @media (max-width: 480px){
        & > p {
            text-align: center;
        }
    }
`