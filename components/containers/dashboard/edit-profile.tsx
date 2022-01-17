import { useEffect, useMemo } from "react"
import { MaxWidthContainer } from "../../atoms/container"
import { showCompleteToast } from "../../../lib/toastify"
import { Heading4, Heading2 } from "../../atoms/headings"
import SectionBox from "../../atoms/sectionBox"
import Paragraph from "../../atoms/paragraph"
import Button from "../../atoms/button"
import styled, { css } from "styled-components"
import Footer from "../../molecules/footer"
import { Formik } from 'formik'
import * as yup from 'yup'
import TextfieldFormik from "../../atoms/textfield-formik"
import axios from "axios"
import { useUpdateUser, useUser } from "../../../hooks/auth"
import Row from "../../atoms/row"
import { useRegisteredNgo } from "../../../hooks/useRegisteredNgo"
import Loader from "../../atoms/loader"
import Seo from "../../atoms/seo"

// Validation Schemas
const validationSchemaEmail = yup.object({
    email: yup.string()
        .email("Must be a valid email")
        .required("Please enter your organisation's email.")
})

const validationSchemaPassword = yup.object({
    password: yup.string()
        .required("Please enter the new password.")
        .min(8, "Password must at least be 8 characters long")
})

const validationSchemaName = yup.object({
    name: yup.string()
        .required("Please enter your name.")
})

export default function EditProfile() {
    const user = useUser() // State to hold banner image
    const { updateUser, success: updateUserSuccess, pending: updateUserPending, error: updateUserError } = useUpdateUser()
    const { ngoRegistered, loading: ngoRegisteredLoading } = useRegisteredNgo()

    // Initial values
    const initialValuesEmail = useMemo(() => ({
        email: user?.email || ""
    }), [user])
    const initialValuesPassword = useMemo(() => ({
        password: ""
    }), [])
    const initialValuesName = useMemo(() => ({
        name: user?.displayName || ""
    }), [user])

    // TODO: REMOVE THIS
    useEffect(() => {
        console.log("User", user)
    }, [user])

    return (
        <>
            {ngoRegisteredLoading ?
                <Loader /> :
                <>
                    <Seo description="Edit your profile." keywords="charity cms dashboard" title="Edit Profile" url={`${process.env.NEXT_PUBLIC_APP_ORIGIN}/dashboard/edit-profile`} />

                    <MaxWidthContainer>
                        {/* Page heading */}
                        <Heading2>Edit profile</Heading2>

                        {/* Display name */}
                        <SectionBox style={{
                            marginTop: "var(--sp-500)"
                        }}>
                            {/* Heading */}
                            <Heading4>Name</Heading4>

                            {/* Sub Heading text */}
                            <Paragraph>
                                Your name which will appear in the contact information in your organisation&apos;s page.
                            </Paragraph>

                            {/* Form */}
                            <Formik validationSchema={validationSchemaName} initialValues={initialValuesName} onSubmit={async (values, helpers) => {
                                helpers.setSubmitting(true)
                                // Create promises that does the work, and combine them
                                const updateNameFirebasePromise = updateUser("name", values.name)
                                const updateNameContentfulPromise = axios.post("/api/updateNgo", {
                                    id: ngoRegistered?.id,
                                    ownerName: values.name
                                })
                                const combinedPromise = Promise.all([updateNameFirebasePromise, updateNameContentfulPromise])

                                try {
                                    // Show notification and resolve promise
                                    await showCompleteToast(combinedPromise, {
                                        error: "Error! Please try again!",
                                        pending: "Please wait...",
                                        success: "Done!"
                                    })
                                } catch (e) {
                                    console.log("Error sending request", e)
                                } finally {
                                    // Submission done
                                    helpers.setSubmitting(false)
                                }
                            }}>
                                {({ handleSubmit, isSubmitting }) => (
                                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                                        {/* Name */}
                                        <TextfieldFormik name="name" label="Name" />

                                        {/* Action buttons */}
                                        <Row vCenter style={{
                                            gap: "var(--sp-400)",
                                            justifyContent: "flex-end"
                                        }}>
                                            {/* Update button */}
                                            <Button disabled={isSubmitting} buttonProps={{
                                                type: "submit"
                                            }}>Update</Button>
                                        </Row>

                                    </Form>
                                )}
                            </Formik>
                        </SectionBox>

                        {/* Email */}
                        <SectionBox style={{
                            marginTop: "var(--sp-400)"
                        }}>
                            {/* Heading */}
                            <Heading4>Email</Heading4>

                            {/* Sub Heading text */}
                            <Paragraph>
                                Your email which will appear in the contact information in your organisation&apos;s page, and the one you will use to sign-in.
                            </Paragraph>

                            {/* Form */}
                            <Formik validationSchema={validationSchemaEmail} initialValues={initialValuesEmail} onSubmit={async (values, helpers) => {
                                helpers.setSubmitting(true)
                                // Create promises that does the work, and combine them
                                const updateEmailFirebasePromise = updateUser("email", values.email)
                                const updateEmailContentfulPromise = axios.post("/api/updateNgo", {
                                    id: ngoRegistered?.id,
                                    charityEmail: values.email
                                })
                                const combinedPromise = Promise.all([updateEmailFirebasePromise, updateEmailContentfulPromise])

                                try {
                                    // Show notification and resolve promise
                                    await showCompleteToast(combinedPromise, {
                                        error: "Error! Please try again!",
                                        pending: "Please wait...",
                                        success: "Done!"
                                    })
                                } catch (e) {
                                    console.log("Error sending request", e)
                                } finally {
                                    // Submission done
                                    helpers.setSubmitting(false)
                                }
                            }}>
                                {({ handleSubmit, isSubmitting }) => (
                                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                                        {/* Email */}
                                        <TextfieldFormik name="email" label="Email" inputProps={{
                                            type: "email"
                                        }} />

                                        {/* Action buttons */}
                                        <Row vCenter style={{
                                            gap: "var(--sp-400)",
                                            justifyContent: "flex-end"
                                        }}>
                                            {/* Update button */}
                                            <Button disabled={isSubmitting} buttonProps={{
                                                type: "submit"
                                            }}>Update</Button>
                                        </Row>

                                    </Form>
                                )}
                            </Formik>
                        </SectionBox>

                        {/* Password */}
                        <SectionBox style={{
                            marginTop: "var(--sp-400)"
                        }}>
                            {/* Heading */}
                            <Heading4>Password</Heading4>

                            {/* Sub Heading text */}
                            <Paragraph>
                                You can set a new password for when you would log in with your email.
                            </Paragraph>

                            {/* Form */}
                            <Formik validationSchema={validationSchemaPassword} initialValues={initialValuesPassword} onSubmit={async (values, helpers) => {
                                helpers.setSubmitting(true)
                                // Promise that does the work
                                const updatePasswordFirebasePromise = updateUser("password", values.password)

                                try {
                                    // Show notification and resolve promise
                                    await showCompleteToast(updatePasswordFirebasePromise, {
                                        error: "Error! Please try again!",
                                        pending: "Please wait...",
                                        success: "Done!"
                                    })
                                } catch (e) {
                                    console.log("Error sending request", e)
                                } finally {
                                    // Submission done
                                    helpers.setSubmitting(false)
                                }
                            }}>
                                {({ handleSubmit, isSubmitting }) => (
                                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                                        {/* Password */}
                                        <TextfieldFormik name="password" label="Password" inputProps={{
                                            type: "password",
                                            autoComplete: "off"
                                        }} />

                                        {/* Action buttons */}
                                        <Row vCenter style={{
                                            gap: "var(--sp-400)",
                                            justifyContent: "flex-end"
                                        }}>
                                            {/* Update button */}
                                            <Button disabled={isSubmitting} buttonProps={{
                                                type: "submit"
                                            }}>Update</Button>
                                        </Row>
                                    </Form>
                                )}
                            </Formik>
                        </SectionBox>

                    </MaxWidthContainer>
                </>
            }
            <Footer />
        </>
    )
}

// Styles
const Form = styled.form`
    ${({ theme }) => css`
        width: 100%;
        margin-top: var(--sp-400);

        & > * + * {
            margin-top: var(--sp-400);
        }
    `}
`