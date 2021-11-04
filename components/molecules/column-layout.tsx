import { Container } from "../atoms/container"
import styled, { css } from "styled-components"
import { ChildrenProp, InlineStyled } from "../../types/comps"

///////////////////////
// TWO COLUMNS (Parent)
///////////////////////
const StyledParentContainer = styled.div`
    display: flex;
    position: relative;
    height: max-content;
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    min-height: inherit;

    @media (max-width: 480px){
        flex-direction: column;
    }
`

interface IParentContainer extends ChildrenProp, InlineStyled { }

export const ParentContainer = ({ children, style }: IParentContainer) => {
    return (
        <Container>
            <StyledParentContainer style={style} className="column-layout-parent">
                {children}
            </StyledParentContainer>
        </Container >
    )
}

////////////////////
// INDIVIDUAL COLUMN
////////////////////
interface IColumn extends ChildrenProp, InlineStyled {
    widthPercentage: number
    widthPercentageMobile: number
    as?: any
    fixed?: boolean
}

const StyledColumn = styled.div<IColumn>`
    ${({ theme, widthPercentage, widthPercentageMobile, fixed }) => css`
        position: relative;
        width: ${widthPercentage}%;

        @media (max-width: 480px){
            width: 100%;
            min-height: ${widthPercentageMobile}vh;
            ${fixed && css`height: ${widthPercentageMobile}vh`}
        }
    `}
`

// LEFT COLUMN
export const Column = ({ children, widthPercentage, widthPercentageMobile, as, style, fixed }: IColumn) => {
    return (
        <StyledColumn style={style} as={as} widthPercentage={widthPercentage} widthPercentageMobile={widthPercentageMobile} fixed={fixed}>
            {children}
        </StyledColumn>
    )
}