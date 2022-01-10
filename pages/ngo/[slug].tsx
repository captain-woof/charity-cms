import { GetStaticPathsContext, GetStaticPaths, GetStaticPropsContext } from "next"
import Details from "../../components/containers/ngo/details"
import { getAllNgo } from "../../lib/contentful"
import { Ngo } from "../../types/ngo"

export const getStaticPaths: GetStaticPaths = async (ctx: GetStaticPathsContext) => {
    const verfiedNgos = await getAllNgo({ isVerified: "true" })
    return {
        paths: verfiedNgos.ngos.map((verfiedNgo) => ({
            params: {
                slug: verfiedNgo.ngoSlug
            }
        })),
        fallback: true
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
    return (
        <>
            {!!ngo && <Details ngo={ngo} />}
            
        </>
    )
}