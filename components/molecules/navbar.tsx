import styled, { css, useTheme } from 'styled-components'
import { BiDonateHeart } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Heading5 } from '../atoms/headings'
import { Link } from '../atoms/link'
import Paper from '../atoms/paper'
import { useState, useMemo } from 'react'
import { useUser } from '../../hooks/auth'
import Row from '../atoms/row'
import Image from 'next/image'
import { User } from '@firebase/auth'

const StyledNavbar = styled.nav`
    ${({ theme }) => css`
        display: flex;
        position: sticky;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 0 var(--sp-500);
        background-color: ${theme.colors.primary.main};
        height: var(--navbar-height);
        width: 100%;
        top: 0;
        left: 0;
        z-index: var(--navbar-z-index);
    `}
`

const SiteLogo = styled(BiDonateHeart)`
    ${({ theme }) => css`
        fill: ${theme.colors.white.light};
        height: auto;
        width: 1.5rem;
        margin-right: 0.5rem;
    `}
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
    ${({ theme }) => css`
        display: none;
        height: 1.2rem;
        width: 1.2rem;
        cursor: pointer;
        fill: ${theme.colors.white.light};
    `}

    @media (max-width: 480px){
        display: block;
    }
`

const NavlinksMenuWrapper = styled.div<{ user?: User }>`
    ${({ theme, user }) => css`
        @keyframes drop-down {
            0% {
                transform: translateY(-2rem);
                opacity: 0;
            }
            100% {
                transform: translateY(0rem);
                opacity: 1;
            }
        }

        top: var(--sp-600);
        position: fixed;    
        z-index: 11;
        right: ${user ? 'var(--sp-800)' : 'var(--sp-500)'};
        animation: drop-down 0.6s ease-in-out both;
        user-select: none;
        width: 50vw;

        @media (min-width: 480px){
            display: none;
        }
    `}
`

const ProfileMenuWrapper = styled(NavlinksMenuWrapper)`
    right: var(--sp-500);
    display: unset;
    width: 200px;

    @media (max-width: 480px){
        width: 50vw;
    }
`

const verMenuStyle = {
    width: '100%',
    padding: 'var(--sp-500) var(--sp-300)'
}

const MenuList = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--sp-500) 0;
`

const ProfilePicCircle = styled.div`
    ${({ theme }) => css`
        background-color: ${theme.colors.white.light};
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
        position: relative;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${theme.colors.primary.main};
        font-weight: 600;
        text-transform: uppercase;
    `}
`

const ProfilePic = styled(Image)`
    position: relative;
    z-index: 1;
    border-radius: 50%;
`

// Interface for list of links to render
interface IMenuItem {
    href: string
    text: string
}

// Data for profile links
const profileMenuItemsData: IMenuItem[] = [
    { href: '/dashboard', text: 'Dashboard' },
    { href: '/dashboard/edit-ngo', text: 'Edit NGO details' },
    { href: '/dashboard/edit-profile', text: 'Edit profile' },
    { href: '/auth/logout', text: 'Log out' }
]

export default function Navbar() {
    const theme = useTheme()
    const [navlinksMenuOpen, setNavlinksMenuOpen] = useState<boolean>(false)
    const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false)

    // List of buttons to render (some depend on logged in state)
    const user = useUser()

    // Data for navlinks
    const navlinksMenuItemsData: IMenuItem[] = useMemo(() => {
        // Items for both logged in and logged out states
        let commonItemsData = [
            { href: `/know-more`, text: 'Know more' },
            { href: `/donate`, text: 'Donate' }
        ]

        // Additional items ONLY if user is not logged in
        if (!user) {
            commonItemsData = [...commonItemsData,
            { href: '/auth/login', text: 'Login' },
            ]
        }
        return commonItemsData
    }, [user])

    return (
        <>
            <StyledNavbar>
                <Link href="/">
                    <SiteLogo id='logo' />
                    <Heading5 style={{ color: theme.colors.white.light }}>
                        Charity CMS
                    </Heading5>
                </Link>
                <Row hCenter vCenter style={{ gap: '0 1.5rem' }}>
                    <HorMenuWrapper>
                        {navlinksMenuItemsData.map((menuItemData, index) => (
                            <MenuItem key={index}>
                                <Link color={theme.colors.white.light} href={menuItemData.href}>{menuItemData.text}</Link>
                            </MenuItem>
                        ))}
                    </HorMenuWrapper>
                    <MenuIcon onClick={() => { setProfileMenuOpen(false); setNavlinksMenuOpen(prev => !prev) }} />
                    {user &&
                        <ProfilePicCircle data-tooltip="Profile menu" data-tooltip-position='bottom-left' onClick={() => { setNavlinksMenuOpen(false); setProfileMenuOpen(prev => !prev) }}>
                            {user.displayName ? user.displayName[0] : user.email[0]}
                            {user.photoURL &&
                                <ProfilePic src={user.photoURL} layout='fill' />
                            }
                        </ProfilePicCircle>
                    }
                </Row>
            </StyledNavbar>
            {navlinksMenuOpen &&
                <NavlinksMenuWrapper user={user} id='navlinks-menu'>
                    <Paper style={verMenuStyle}>
                        <MenuList>
                            {navlinksMenuItemsData.map((menuItemData, index) => (
                                <MenuItem key={index} onClick={() => { setNavlinksMenuOpen(false) }}>
                                    <Link color={theme.colors.black.light} href={menuItemData.href} >{menuItemData.text}</Link>
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Paper>
                </NavlinksMenuWrapper>
            }
            {profileMenuOpen &&
                <ProfileMenuWrapper id='profile-menu'>
                    <Paper style={verMenuStyle}>
                        <MenuList>
                            {profileMenuItemsData.map((menuItemData, index) => (
                                <MenuItem key={index} onClick={() => { setProfileMenuOpen(false) }}>
                                    <Link color={theme.colors.black.light} href={menuItemData.href}>{menuItemData.text}</Link>
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Paper>
                </ProfileMenuWrapper>
            }
        </>
    )
}