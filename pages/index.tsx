import { useEffect } from 'react'
import 'styled-components'
import styled, { css } from 'styled-components'
import Button from '../components/atoms/button'
import { useOAuth, useSignOut, useUser } from '../hooks/auth'

const Heading = styled.h1`
  ${({ theme }) => (css`
    color: ${theme.colors.primary.main};
  `)}
`

export default function Home() {
  const { signIn } = useOAuth()
  const { signOut } = useSignOut()
  const user = useUser()

  useEffect(() => {
    if (user) {
      console.log(user)
    }
  }, [user])

  return (
    <div>
      <Heading>Google OAuth Test</Heading>
      <p>Currently logged in as: {user ? user.displayName : 'nobody'}</p>
      <Button buttonProps={{ 'onClick': () => { signIn('google') } }}>Sign in with Google</Button>
      <Button buttonProps={{ 'onClick': () => { signOut() } }}>Sign Out</Button>
    </div>
  )
}
