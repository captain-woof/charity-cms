import TextfieldFormik from "../../components/atoms/textfield-formik"
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'
import { verifyIdToken } from "../../utils/auth-server"
import { Container } from "../../components/atoms/container"
import styled, { css, useTheme } from "styled-components"
import { Heading4 } from "../../components/atoms/headings"
import { useEffect } from "react"
import Button from "../../components/atoms/button"
import { BsGoogle } from 'react-icons/bs'
import { Link } from "../../components/atoms/link"
import { useOAuth, useSignInWithEmailAndPassword, useUser } from "../../hooks/auth"
import { useRouter } from "next/router"
import * as yup from 'yup'
import { Form, Formik } from 'formik'
import ErrorMessage from "../../components/atoms/error-message"

// Check if user is already logged in (Server side)
export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const cookies = parseCookies(ctx)
    if (cookies.token) {
        const { status } = await verifyIdToken(cookies.token)
        if (status) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false,
                }
            }
        }
    }
    return {
        props: {}
    }
}

const FormBox = styled.main`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        width: clamp(300px, 25vw, 320px);
        background-color: ${theme.colors.white.light};
        border-radius: ${theme.borderRadius.medium}px;
        position: relative;
        align-items: center;
        justify-content: center;
        padding: var(--sp-400);

        @media (max-width: 480px){
            width: 100%;
            min-width: unset;
            max-width: unset;
        }
    `}
`

const LoginForm = styled(Form)`
    width: 100%;
    padding: var(--sp-400);
    padding-bottom: var(--sp-200);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: var(--sp-500) 0;
`

const OAuthContainer = styled(LoginForm)`
    gap: var(--sp-300) 0;
    align-items: center;
`

/* Form validation */
const validationSchema = yup.object({
    email: yup
        .string()
        .email("Invalid email address")
        .required("Required"),
    password: yup
        .string()
        .required("Required"),
})

/* Form initial values */
const initialValues = {
    email: '',
    password: ''
}

export default function Login() {
    const router = useRouter()
    const theme = useTheme()
    const { signIn: signInWithEmailAndPassword, pending, error: loginError } = useSignInWithEmailAndPassword()
    const { signIn: signInWithOAuth } = useOAuth()
    const user = useUser()

    useEffect(() => {
        if (user) {
            router.push('/dashboard')
        }
    }, [user, router])

    return (
        <Container style={{
            backgroundColor: theme.colors.primary.main,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 'var(--sp-400) 0'
        }}>
            <Formik validationSchema={validationSchema} initialValues={initialValues}
                onSubmit={({ email, password }, { setSubmitting }) => {
                    signInWithEmailAndPassword(email, password)
                    setSubmitting(false)
                }}>
                {({ handleSubmit, isValid, isSubmitting }) => (
                    <FormBox>
                        <Heading4 style={{ fontWeight: 600 }}>Login</Heading4>
                        <LoginForm onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit()
                        }}>
                            <TextfieldFormik label='Email' name='email' inputProps={{
                                type: "email"
                            }} />
                            <TextfieldFormik label='Password' name='password' inputProps={{
                                type: 'password'
                            }} />
                            <Button disabled={pending || (!isValid) || (isSubmitting)} buttonProps={{
                                type: 'submit'
                            }}>Login</Button>
                        </LoginForm>
                        <Link href="/auth/forgot-password" color={theme.colors.primary.main} style={{
                            fontSize: 'var(--fs-300)',
                            alignSelf: 'flex-end',
                            marginRight: 'var(--sp-300)'
                        }}>Forgot password ?</Link>
                        <ErrorMessage show={!!loginError} error={loginError} variant='normal' align='center' style={{ marginTop: '0.25rem' }} />
                        <OAuthContainer>
                            <p style={{
                                color: theme.colors.black.light,
                                fontWeight: 600,
                                fontSize: 'var(--fs-400)',
                                fontFamily: theme.font.family.secondary
                            }}>
                                Or
                            </p>
                            <Button iconStart={<BsGoogle />} style={{
                                backgroundColor: '#DB4437'
                            }} buttonProps={{
                                onClick: (e) => { e.preventDefault(); signInWithOAuth('google') }
                            }}>
                                Login with Google
                            </Button>
                        </OAuthContainer>
                    </FormBox>
                )}
            </Formik>
            <Link href='/auth/signup' color={theme.colors.white.light} style={{
                fontFamily: theme.font.family.secondary,
                fontWeight: 600
            }}>
                Don&apos;t have an account? Sign up!
            </Link>
        </Container>
    )
}