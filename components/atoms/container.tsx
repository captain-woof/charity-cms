import styled from 'styled-components'
import { ChildrenProp, InlineStyled } from '../../types/comps'

// Interface
interface IContainer extends InlineStyled, ChildrenProp {}

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

export const LobotomizedContainer = ({ children, style }: IContainer) => {
    return (
        <StyledLobotomizedContainer style={style} className='container-lobotomized'>
            {children}
        </StyledLobotomizedContainer>
    )
}

export const Container = ({ children, style }: IContainer) => {
    return (
        <StyledContainer style={style} className='container'>
            {children}
        </StyledContainer>
    )
}