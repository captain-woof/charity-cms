import { useUser, useSignInWithEmailAndPassword } from '../hooks/auth'

export default function Home() {
  const user = useUser()
  const { pending, success, signIn } = useSignInWithEmailAndPassword()

  return (
    <div>
      <h1>React + TS is awesome!</h1>
    </div>
  )
}
