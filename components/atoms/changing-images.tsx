import styled, { css } from "styled-components"
import NextImage from 'next/image'
import useTransitioningItem from "../../hooks/useTransitioningItem"
import { InlineStyled } from "../../types/comps"

const ChangingImagesWrapper = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
`

const Image = styled(NextImage)`
    ${({ theme }) => css`
        position: absolute;
        opacity: 0;
        transition: opacity 1.2s linear;

        &.visible {
            opacity: 1;
        }
    `}
`

interface IChangingImages extends InlineStyled {
    images: string[]
    altPrefix: string
}

export default function ChangingImages({ images, altPrefix, style }: IChangingImages) {
    const { currentIndex } = useTransitioningItem(images, 6)

    return (
        <ChangingImagesWrapper style={style} className="changing-images">
            {images.map((imageSrc, index) => (
                <Image src={imageSrc} alt={`${altPrefix} - ${index}`} key={index} layout='fill' objectFit='cover' objectPosition='center center' className={`changing-image ${currentIndex === index && "visible"}`} quality={70} />
            ))}
        </ChangingImagesWrapper>
    )
}