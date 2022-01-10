import styled from 'styled-components'
import { ChildrenProp, Id, InlineStyled } from '../../types/comps'

// Interface
interface IContainer extends InlineStyled, ChildrenProp, Id { }

const StyledContainer = styled.div`
    min-height: calc(100vh - var(--navbar-height));
    max-width: 100%;
    padding: var(--sp-500);
    position: relative;

    @media (max-width: 480px) {
        & {
            padding: var(--sp-500) var(--sp-400);
        }
    }
`

const StyledLobotomizedContainer = styled(StyledContainer)`
    & > * + * {
        margin-top: var(--sp-300);
    }
`

const StyledMaxWidthContainer = styled(StyledContainer)`
    width: 80%;
    max-width: 768px;
    margin: 0 auto;

    @media (max-width: 480px) {
        & {
            width: 100%;
        }
    }
`

export const LobotomizedContainer = ({ children, style, id }: IContainer) => {
    return (
        <StyledLobotomizedContainer id={id} style={style} className='container-lobotomized'>
            {children}
        </StyledLobotomizedContainer>
    )
}

export const Container = ({ children, style, id }: IContainer) => {
    return (
        <StyledContainer id={id} style={style} className='container'>
            {children}
        </StyledContainer>
    )
}

export const MaxWidthContainer = ({ children, style, id }: IContainer) => {
    return (
        <StyledMaxWidthContainer id={id} style={style} className='container-maxwidth'>
            {children}
        </StyledMaxWidthContainer>
    )
}