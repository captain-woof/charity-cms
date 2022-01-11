import { getAllNgo, getCategories } from "../lib/contentful"
import { InferGetStaticPropsType } from "next"
import { CategoryAndNgos } from "../types/category"
import Donate from "../components/containers/donate"

export async function getStaticProps() {
    // Get all categories
    const { categories } = await getCategories()

    // Fetch all ngos and store them category-wise data
    const categoriesAndNgos: Array<CategoryAndNgos> = []
    const allNgos = await getAllNgo({ isVerified: "true" })

    categories.forEach(({ categoryName }) => {
        const ngosToAdd = allNgos.ngos.filter((ngoToTest) => (ngoToTest.category === categoryName))
        if (ngosToAdd.length !== 0) {
            categoriesAndNgos.push({
                categoryName,
                ngos: ngosToAdd
            })
        }
    })

    return {
        props: {
            categoriesAndNgos
        },
        revalidate: 60
    }
}

export default function DonatePage({ categoriesAndNgos }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Donate categoriesAndNgos={categoriesAndNgos} />
    )
}