import Head from 'next/head'
import { useTheme } from 'styled-components'

interface ISeo {
    title: string
    description: string
    url: string
    keywords: string
}

export default function Seo({ title, description, url, keywords }: ISeo) {
    const theme = useTheme()

    return (
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="Sohail Saha (captain-woof)" />
            <meta name="author" content="Rajarshi Biswas (Rajarshi38)" />
            <meta name="author" content="Swaraj Khan (first-phoenix)" />
            <meta name="robots" content="index, follow" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content="Charity CMS" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="theme-color" content={theme.colors.primary.main} />
        </Head>
    )
}