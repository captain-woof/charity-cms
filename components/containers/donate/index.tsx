import { useCallback, useEffect, useState } from "react";
import { getAllNgo } from "../../../lib/contentful";
import { CategoryAndNgos } from "../../../types/category";
import { Ngo } from "../../../types/ngo";
import { MaxWidthContainer } from "../../atoms/container";
import { Heading1 } from "../../atoms/headings";
import Textfield from "../../atoms/textfield";
import Footer from "../../molecules/footer";
import Categories from "./categories"
import Seo from "../../atoms/seo"

interface Donate {
    categoriesAndNgos: Array<CategoryAndNgos>
}

export default function Donate({ categoriesAndNgos }: Donate) {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [searchedNgos, setSearchedNgos] = useState<Array<Ngo> | null>(null)
    const [searching, setSearching] = useState<boolean>(false)

    // Function to handle search
    const handleSearch = useCallback(async () => {
        if (searchTerm.length === 0) {
            setSearchedNgos(null)
        } else {
            setSearching(true)
            const searchResults = await getAllNgo({ titleSearch: searchTerm })
            setSearchedNgos(searchResults.ngos)
            setSearching(false)
        }
    }, [searchTerm])

    // Resets if search term is ""
    useEffect(() => {
        if (searchTerm.length === 0) {
            setSearchedNgos(null)
        }
    }, [searchTerm])

    return (
        <>
            <Seo title="Donate" description="See all listed charities, search for charities, and donate to your cause." url={`${process.env.NEXT_PUBLIC_APP_ORIGIN}/donate`} keywords="donate to ngo, charity cms, donate to charity, search ngo"/>
            <MaxWidthContainer>
                <Heading1 style={{ textAlign: 'center' }}>
                    Donate
                </Heading1>
                <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} style={{ marginTop: "var(--sp-400)" }}>
                    <Textfield label="Search" name="search" inputProps={{
                        value: searchTerm,
                        onChange: (e) => { setSearchTerm(e.target.value) },
                        disabled: searching,
                        type: "search"
                    }} />
                </form>
                {!!searchedNgos
                    ? <Categories categoriesAndNgos={[{
                        categoryName: `Showing ${searchedNgos.length} results for "${searchTerm}"`,
                        ngos: searchedNgos
                    }]} />
                    : <Categories categoriesAndNgos={categoriesAndNgos} />
                }
            </MaxWidthContainer>
            <Footer />
        </>
    )
}