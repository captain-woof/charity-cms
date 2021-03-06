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
import { useOAuth, useSignUpWithEmailAndPassword } from "../../hooks/auth"
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

const SignupForm = styled(Form)`
    width: 100%;
    padding: var(--sp-400);
    padding-bottom: var(--sp-200);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: var(--sp-500) 0;
`

const OAuthContainer = styled(SignupForm)`
    gap: var(--sp-300) 0;
    align-items: center;
`

// Initial form values
const initialValues = {
    displayName: '',
    email: '',
    password: '',
    passwordCnf: ''
}

// Form validation schema
const validationSchema = yup.object({
    displayName: yup
        .string()
        .required('Required'),
    email: yup
        .string()
        .required('Required')
        .email("Must be a valid email address."),
    password: yup
        .string()
        .required('Required')
        .min(8, "Must be a minimum of 8 characters."),
    passwordCnf: yup
        .string()
        .required('Required')
        .oneOf([yup.ref('password')], "Passwords do not match!")
})

export default function Signup() {
    const router = useRouter()
    const theme = useTheme()
    const { signUp: signUpWithEmailAndPassword, pending, success: successSignUpWithEmailAndPassword, error: errorSignup } = useSignUpWithEmailAndPassword()
    const { signIn: signInWithOAuth, success: successSignUpWithOAuth } = useOAuth()

    useEffect(() => {
        if (successSignUpWithEmailAndPassword || successSignUpWithOAuth) {
            router.push('/dashboard')
        }
    }, [successSignUpWithOAuth, router, successSignUpWithEmailAndPassword])

    return (
        <Container style={{
            backgroundColor: theme.colors.primary.main,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 'var(--sp-400) 0'
        }}>
            <Formik initialValues={initialValues} validationSchema={validationSchema}
                onSubmit={({ displayName, email, password }, { setSubmitting }) => {
                    signUpWithEmailAndPassword(email, password, displayName)
                    setSubmitting(false)
                }}>
                {({ handleSubmit, isSubmitting, isValid }) => (
                    <>
                        <FormBox>
                            <Heading4 style={{
                                fontWeight: 600
                            }}>Sign up</Heading4>
                            <SignupForm onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit()
                            }}>
                                <TextfieldFormik label='Name' name='displayName' />
                                <TextfieldFormik label='Email' name='email' inputProps={{
                                    type: "email"
                                }} />
                                <TextfieldFormik label='Password' name='password' inputProps={{
                                    type: 'password'
                                }} />
                                <TextfieldFormik label='Confirm password' name='passwordCnf' inputProps={{
                                    type: 'password'
                                }} />
                                <Button disabled={pending || (!isValid)} buttonProps={{
                                    type: 'submit'
                                }}>Sign up</Button>
                            </SignupForm>
                            <ErrorMessage show={!!errorSignup} error={errorSignup} variant='normal' align='center' style={{ marginTop: '0.25rem' }} />
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
                                    Signup with Google
                                </Button>
                            </OAuthContainer>
                        </FormBox>
                        <Link href='/auth/login' color={theme.colors.white.light} style={{
                            fontFamily: theme.font.family.secondary,
                            fontWeight: 600
                        }}>
                            Already have an account? Sign in!
                        </Link>
                    </>
                )}
            </Formik>
        </Container>
    )
}