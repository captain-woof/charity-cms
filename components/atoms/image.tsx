import ImageNext from 'next/image'

interface IImage {
    id?: string
    alt: string
    src: string
    objectPosition: string | number
}

export const Image = ({ id, alt, src, objectPosition = 'center' }: IImage) => {
    <ImageNext id={id} src={src} alt={alt} layout='fill' objectFit='cover' objectPosition={objectPosition} />
}