import 'styled-components'
import styled, { css } from 'styled-components'

const Heading = styled.h1`
  ${({theme}) => (css`
    color: ${theme.colors.primary.main};
  `)}
`

export default function Home() {
  return (
    <div>
      <Heading>React + TS is awesome!</Heading>
    </div>
  )
}
