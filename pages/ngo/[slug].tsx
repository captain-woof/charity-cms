import { GetStaticPathsContext, GetStaticPaths, GetStaticPropsContext } from "next"
import Details from "../../components/containers/ngo/details"
import { getAllNgo } from "../../lib/contentful"
import { Ngo } from "../../types/ngo"
import { useRouter } from 'next/router'
import Loader from "../../components/atoms/loader"

export const getStaticPaths: GetStaticPaths = async (ctx: GetStaticPathsContext) => {
    const verfiedNgos = await getAllNgo({ isVerified: "true" })
    return {
        paths: verfiedNgos.ngos.map((verfiedNgo) => ({
            params: {
                slug: verfiedNgo.ngoSlug
            }
        })),
        fallback: "blocking"
    }
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
    try {
        const ngoSlug = ctx.params.slug as string
        const ngo = (await getAllNgo({ isVerified: "true", ngoSlug })).ngos[0]
        return {
            props: {
                ngo
            },
            revalidate: 60
        }
    } catch {
        return {
            notFound: true
        }
    }
}

export default function NgoPage({ ngo }: { ngo: Ngo }) {
    const router = useRouter()

    if(router.isFallback){
        return (
            <Loader />
        )
    }

    return (
        <>
            {!!ngo && <Details ngo={ngo} />}
        </>
    )
}