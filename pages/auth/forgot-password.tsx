import TextfieldFormik from "../../components/atoms/textfield-formik"
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'
import { verifyIdToken } from "../../utils/auth-server"
import { Container } from "../../components/atoms/container"
import styled, { css, useTheme } from "styled-components"
import { Heading4 } from "../../components/atoms/headings"
import Button from "../../components/atoms/button"
import { useSendPasswordResetEmail } from "../../hooks/auth"
import { Formik, Form } from "formik"
import * as yup from 'yup'

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    // Check if user is already logged in (Server side)
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

const ForgotPasswordForm = styled(Form)`
    width: 100%;
    padding: var(--sp-400);
    padding-bottom: var(--sp-200);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: var(--sp-500) 0;
`

/* Form initial values */
const initialValues = {
    email: ''
}

/* Form validator */
const validationSchema = yup.object({
    email: yup
        .string()
        .required("Required")
        .email("Must be a valid email")
})

export default function ForgorPassword() {
    const theme = useTheme()
    const { sendPasswordResetEmail, pending, success, error } = useSendPasswordResetEmail()

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
                onSubmit={({ email }, { setSubmitting }) => {
                    sendPasswordResetEmail(email)
                    setSubmitting(false)
                }}>
                {({ handleSubmit, isValid, isSubmitting }) => (
                    <>
                        <FormBox>
                            <Heading4 style={{
                                fontWeight: 600
                            }}>
                                Reset Password
                            </Heading4>
                            <ForgotPasswordForm onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit()
                            }}>
                                <p style={{
                                    color: theme.colors.black.light
                                }}>
                                    Enter the email you signed up with.
                                </p>
                                <TextfieldFormik label='Email' name='email' />
                                <Button disabled={!isValid || isSubmitting} buttonProps={{
                                    type: 'submit'
                                }}>Submit</Button>
                            </ForgotPasswordForm>
                        </FormBox>
                        <p style={{
                            color: theme.colors.white.light,
                            fontWeight: 600,
                            fontSize: 'var(--fs-400)',
                            fontFamily: theme.font.family.secondary
                        }}>
                            {(success || error) && "Check your email for instructions to reset your password."}
                        </p>
                    </>
                )}
            </Formik>
        </Container>
    )
}