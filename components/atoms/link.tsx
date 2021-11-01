import styled, { css } from 'styled-components'
import LinkNext from 'next/link'
import { ChildrenProp, InlineStyled } from '../../types/comps'

const Anchor = styled.a`
    ${({ theme, color }) => (css`
        text-decoration: none;
        color: ${color || theme.colors.secondary.main};
        width: fit-content;
        transition: ${theme.transition('color').normal};
        position: relative;
        overflow: hidden;
        width: fit-content;
        cursor: pointer;
        display: inline-flex;
        font-weight: 500;
        font-family: ${theme.font.family.secondary};

        &:hover {
            color: ${color || theme.colors.secondary.dark};
        }

        &::after {
            content: '';
            border-radius: 100rem;
            position: absolute;
            width: 100%;
            height: 0.125rem;
            background-color: ${color || theme.colors.primary.main};
            transition: ${theme.transition('left').normal};
            z-index: -1;
            left: -100%;
            bottom: 0;
            display: block;
        }

        &:hover::after {
            left: 0%;
        }
    `)}    
`

interface ILink extends ChildrenProp, InlineStyled {
    id?: string
    href: string
    color?: string
}

export const Link = ({ id, href, children, style, color }: ILink) => {
    return (
        <LinkNext href={href}>
            <Anchor id={id} style={style} color={color}>{children}</Anchor>
        </LinkNext>
    )
}

export const LinkExternal = ({ id, href, children, style, color }: ILink) => {
    return (
        <Anchor id={id} href={href} target='_blank' style={style} color={color}>{children}</Anchor>
    )
}