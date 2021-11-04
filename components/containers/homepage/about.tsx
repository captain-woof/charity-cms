import styled, { css } from "styled-components"
import { ParentContainer, Column } from '../../molecules/column-layout'
import ChangingImages from "../../atoms/changing-images"
import { Heading2 } from "../../atoms/headings"
import Paragraph from "../../atoms/paragraph"

const images = [
    "/api/imageproxy?url=https://unsplash.it/800/600",
    "/api/imageproxy?url=https://unsplash.it/900/600",
    "/api/imageproxy?url=https://unsplash.it/1200/900"
]

export default function About() {
    return (
        <ParentContainer>
            <Column widthPercentage={40} widthPercentageMobile={40} fixed as='aside'>
                <ChangingImages altPrefix="About pics" images={images} />
            </Column>
            <Column widthPercentage={60} widthPercentageMobile={60} as='main'>
                <section>
                    <Heading2>What is this site?</Heading2>
                    <Paragraph>Simply put, this site is a one-stop place for charities and NGOs to have their organizations listed, and for you to easily see which causes need your help.</Paragraph>
                    <Paragraph>This site categorizes all registered (and verified) non-profit organizations, and provides you a simple catalog to browse through, so that you don&apos;t have to go looking for these organizations separately.</Paragraph>
                </section>
                <section>
                    <Heading2>How can you help?</Heading2>
                    <Paragraph>Nothing in this world is free. You get what you pay for. Unfortunately, many are not priviledged enough to pay for their needs - food, water, clothes, and shelter. Some may get into unforeseen circumstances due to natural disasters.</Paragraph>
                    <Paragraph>We ask you to consider donating anything you can spare. You can access the list of organisations listed on our site. Choose one that works for the cause you support, and make a donation.</Paragraph>
                    <Paragraph>Every donation has the potential of changing a life.</Paragraph>
                </section>
            </Column>
        </ParentContainer >
    )
}