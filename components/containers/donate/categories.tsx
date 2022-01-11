import { CategoryAndNgos } from "../../../types/category";
import styled from 'styled-components'
import { Heading3, Heading4 } from "../../atoms/headings";
import Paper from "../../atoms/paper";
import NgoCard from "./ngoCard";

interface Categories {
    categoriesAndNgos: Array<CategoryAndNgos>
}

export default function Categories({ categoriesAndNgos }: Categories) {
    return (
        <CategoriesContainer>
            {categoriesAndNgos.map((categoryAndNgos, index) => (
                <Category categoryAndNgos={categoryAndNgos} key={`category-${index}-${categoryAndNgos.categoryName}`} />
            ))}
        </CategoriesContainer>
    )
}

const CategoriesContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: var(--sp-600);
    margin-top: var(--sp-600);
`

// Individual category component
const Category = ({ categoryAndNgos }: { categoryAndNgos: CategoryAndNgos }) => {

    return (
        <CategoryContainer>
            <Heading3 style={{
                marginBottom: "var(--sp-400)",
                fontWeight: 500
            }}>
                {categoryAndNgos.categoryName}
            </Heading3>
            <NgosContainer>
                {categoryAndNgos.ngos.map((ngo, index) => (
                    <NgoCard key={`ngo-${index}-${ngo.ngoSlug}`} ngo={ngo} />
                ))}
            </NgosContainer>
        </CategoryContainer>
    )
}

const CategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const NgosContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--sp-300);
`