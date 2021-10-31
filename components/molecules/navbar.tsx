import styled, { css, useTheme } from 'styled-components'
import { FaToolbox } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Heading5 } from '../atoms/headings'
import { Link, LinkExternal } from '../atoms/link'
import Paper from '../atoms/paper'
import { useState, useMemo } from 'react'
import { useUser } from '../../hooks/auth'

const StyledNavbar = styled.nav`
    ${({ theme }) => css`
        display: flex;
        position: sticky;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 0 var(--sp-500);
        background-color: ${theme.colors.white.light};
        height: 4rem;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 10;
        border-bottom: 2.8px solid ${theme.colors.primary.main};
    `}
`

const LogoWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    gap: 0 1rem;
    height: 100%;
    justify-content: center;
    align-items: center;
`

const HorMenuWrapper = styled.ul`
    display: flex;
    justify-content: space-evenly;
    gap: 0 1rem;
    list-style: none;
    position: relative;

    @media (max-width: 480px){
        display: none;
    }
`

const MenuItem = styled.li`
    padding: 0 var(--sp-400);
    position: relative;
    display: flex;
    align-items: center;
`

const MenuIcon = styled(GiHamburgerMenu)`
    display: none;
    height: 1.2rem;
    width: 1.2rem;
    cursor: pointer;

    @media (max-width: 480px){
        display: block;
    }
`

const VerMenuWrapper = styled.div`
    @keyframes drop-down {
        0% {
            top: 0;
            opacity: 0;
        }
        100% {
            top: var(--sp-600);
            opacity: 1;
        }
    }

    position: fixed;    
    z-index: 11;
    right: var(--sp-500);
    animation: drop-down 0.5s ease-in-out both;
    user-select: none;

    @media (min-width: 480px){
        display: none;
    }
`

const verMenuStyle = {
    width: '100%',
    padding: 'var(--sp-300)'
}

const MenuList = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--sp-400) 0;
`

// Interface for list of buttons to render
interface IMenuItem {
    href: string
    text: string
}

export default function Navbar() {
    const theme = useTheme()
    const [verMenuOpen, setVerMenuOpen] = useState<boolean>(false)

    // List of buttons to render (some depend on logged in state)
    const user = useUser()

    const menuItemsData: IMenuItem[] = useMemo(() => {
        if (user) {
            return [
                { href: `/about`, text: 'About' },
                { href: `/donate`, text: 'Donate' },
                { href: `/dashboard`, text: 'Dashboard' },
                { href: `/auth/logout`, text: 'Logout' },
            ]
        } else {
            return [
                { href: `/about`, text: 'About' },
                { href: `/donate`, text: 'Donate' },
                { href: `/auth/login`, text: 'Login' },
            ]
        }
    }, [user])

    return (
        <>
            <StyledNavbar>
                <LogoWrapper>
                    <FaToolbox id='logo' fill={theme.colors.primary.dark} />
                    <Link href="/"><Heading5>Tools</Heading5></Link>
                </LogoWrapper>
                <HorMenuWrapper>
                    {menuItemsData.map((menuItemData, index) => (
                        <MenuItem key={index}>
                            <LinkExternal href={menuItemData.href}>{menuItemData.text}</LinkExternal>
                        </MenuItem>
                    ))}
                </HorMenuWrapper>
                <MenuIcon onClick={() => { setVerMenuOpen(prev => !prev) }} fill={verMenuOpen ? theme.colors.primary.dark : theme.colors.secondary.dark} />
            </StyledNavbar>
            {verMenuOpen &&
                <VerMenuWrapper id='vertical-menu'>
                    <Paper style={verMenuStyle}>
                        <MenuList>
                            {menuItemsData.map((menuItemData, index) => (
                                <MenuItem key={index}>
                                    <LinkExternal href={menuItemData.href}>{menuItemData.text}</LinkExternal>
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Paper>
                </VerMenuWrapper>
            }
        </>
    )
}