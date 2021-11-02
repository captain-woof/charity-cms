import { Container } from '../components/atoms/container'
import { Heading1 } from '../components/atoms/headings'
import Column from '../components/atoms/column'

export default function FourOhFour() {
  return (
    <Container style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Column hCenter vCenter>
        <Heading1>404</Heading1>
        <p>This page does not exist!</p>
      </Column>
    </Container>
  )
}
