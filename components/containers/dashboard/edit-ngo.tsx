import { useEffect, useMemo, useState } from "react"
import Loader from "../../atoms/loader"
import { MaxWidthContainer } from "../../atoms/container"
import { showCompleteToast } from "../../../lib/toastify"
import { useRegisteredNgo } from "../../../hooks/useRegisteredNgo"
import { Heading4 } from "../../atoms/headings"
import SectionBox from "../../atoms/sectionBox"
import Paragraph from "../../atoms/paragraph"
import LinkNext from 'next/link'
import Button from "../../atoms/button"
import styled, { css } from "styled-components"
import Footer from "../../molecules/footer"
import { Formik } from 'formik'
import * as yup from 'yup'
import TextfieldFormik from "../../atoms/textfield-formik"
import TextAreaFormik from "../../atoms/textarea-formik"
import { CategoryList } from "../../../types/ngo"
import RadioButtons from "../../atoms/radioButtons"
import FileInputFormik from "../../atoms/fileinput-formik"
import { convertMbToBytes } from "../../../utils/numerics"
import { useInputFile } from "../../../hooks/useInputFile"
import axios from "axios"
import { useUpdateUser, useUser } from "../../../hooks/auth"
import Row from "../../atoms/row"

// Filetypes supported
const imageFileTypes = ["image/bmp", "image/gif", "image/png", "image/svg+xml", "image/webp", "image/jpeg"]
const verificationDocFileTypes = ["application/pdf"]

// Max file sizes
const MAX_FILE_SIZE = convertMbToBytes(5)

// Component
interface Dashboard {
    ngoCategories: CategoryList
}

export default function Dashboard({ ngoCategories }: Dashboard) {
    const { loading, ngoRegistered, ngoStatus } = useRegisteredNgo()
    const [verificationPdfFile, onVerificationPdfFileInput, verificationPdfFileStat] = useInputFile(MAX_FILE_SIZE, verificationDocFileTypes) // State to hold verification doc
    const [imageFile, onImageFileInput, imageFileStat] = useInputFile(MAX_FILE_SIZE, imageFileTypes)
    const user = useUser() // State to hold banner image
    const [imageFileChanged, setImageFileChanged] = useState<boolean>(false) // State to track if image file was changed
    const [verificationPdfFileChanged, setverificationPdfFileChanged] = useState<boolean>(false) // State to track if verification file was changed
    const { updateUser, success: updateUserSuccess, pending: updateUserPending, error: updateUserError } = useUpdateUser()

    // Validation Schema
    const validationSchema = useMemo(() => (
        yup.object({
            title: yup.string()
                .required("Please enter your organisation's name."),
            description: yup.string()
                .required("Please write the description for your organisation's dedicated page."),
            yearOfEstablish: yup.number()
                .required("Please enter the year of establishment.")
                .max((new Date()).getFullYear(), "Please enter a valid year.")
                .min(0, "Please enter a valid year."),
            charityEmail: yup.string()
                .email("Must be a valid email")
                .required("Please enter your organisation's email."),
            contact: yup.string()
                .required("Please enter your organisation's contact number."),
            ownerName: yup.string()
                .required("Please enter your name."),
            category: yup.string()
                .required("Please choose a category for your organization.")
                .oneOf(ngoCategories.categories.map(({ categoryName }) => (categoryName))),
            image: yup.mixed(),
            verificationPdf: yup.mixed()
        })
    ), [ngoCategories])

    // Initial values
    const initialValues = useMemo(() => {
        if (ngoStatus === "NEW_ACCOUNT") {
            return ({
                title: "",
                description: "",
                yearOfEstablish: "",
                charityEmail: user?.email || "",
                contact: "",
                ownerName: "",
                category: "",
                image: "",
                verificationPdf: ""
            })
        } else {
            return ({
                title: ngoRegistered?.title || "",
                description: ngoRegistered?.description || "",
                yearOfEstablish: ngoRegistered?.yearOfEstablish || "",
                charityEmail: ngoRegistered?.charityEmail || "",
                contact: ngoRegistered?.contact || "",
                ownerName: ngoRegistered?.ownerName || "",
                category: ngoRegistered?.category || "",
                image: "",
                verificationPdf: ""
            })
        }
    }, [ngoRegistered, ngoStatus, user])

    return (
        <>
            {(loading) ?
                <Loader /> :
                <MaxWidthContainer>

                    <SectionBox>
                        {/* Heading */}
                        <Heading4>
                            {ngoStatus === "NEW_ACCOUNT" ? "Add details" : "Edit details"}
                        </Heading4>

                        {/* Sub Heading text */}
                        <Paragraph>
                            Use the below form to {ngoStatus === "NEW_ACCOUNT" ? "add your organisation details, and submit it for verification. Verification usually takes a few days to be done." : "edit your organisation's details."}
                        </Paragraph>

                        {/* Form */}
                        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={async (values, helpers) => {
                            /* Handle form submission */

                            // Function to validate files
                            const validateFiles = () => {
                                if (ngoStatus === "NEW_ACCOUNT") { // If files are mandatory
                                    /* Validate image file */
                                    if (imageFileStat === "NO_FILE_CHOSEN") {
                                        helpers.setFieldError("image", "Please upload a banner image for your organisation.")
                                    }
                                    else if (imageFileStat === "FILE_SIZE_EXCEEDED") {
                                        helpers.setFieldError("image", "Maximum file size allowed is 5 MB.")
                                    } else if (imageFileStat === "UNSUPPORTED_FILE_TYPE") {
                                        helpers.setFieldError("image", "Unsupported file type. Only GIF, JPG, SVG, WEBP, PNG and BMP files are supported.")
                                    }

                                    /* Validate verification file */
                                    if (verificationPdfFileStat === "NO_FILE_CHOSEN") {
                                        helpers.setFieldError("verificationPdf", "Please upload a proof of registration (PDF).")
                                    }
                                    else if (verificationPdfFileStat === "FILE_SIZE_EXCEEDED") {
                                        helpers.setFieldError("verificationPdf", "Maximum file size allowed is 5 MB.")
                                    } else if (verificationPdfFileStat === "UNSUPPORTED_FILE_TYPE") {
                                        helpers.setFieldError("verificationPdf", "Unsupported file type. Only a PDF file is supported.")
                                    }

                                    // Return
                                    return (imageFileStat === "OK" && verificationPdfFileStat === "OK")
                                } else { // If files are optional
                                    return true
                                }
                            }

                            // Function to create form data
                            const createFormData = (fields: { [key: string]: any }) => {
                                const formData = new FormData()
                                for (let fieldName in fields) {
                                    formData.append(fieldName, fields[fieldName])
                                }
                                return formData
                            }

                            // Logics are different for Adding NGO and Editing NGO
                            if (ngoStatus === "NEW_ACCOUNT") { // If NGO is new
                                /* Submit form only if everything is valid */
                                if (validateFiles()) {
                                    // Get fields to send
                                    const { category, charityEmail, contact, description, ownerName, title, yearOfEstablish } = values

                                    // Get form data for axios
                                    const formData = createFormData({
                                        category,
                                        charityEmail,
                                        contact,
                                        description,
                                        ownerName,
                                        title,
                                        yearOfEstablish,
                                        image: imageFile,
                                        verificationPdf: verificationPdfFile
                                    })

                                    // Create promise that sends payload to api
                                    const createNgoPromise = new Promise((resolve, reject) => {
                                        axios.post("/api/createNgos", formData, {
                                            headers: {
                                                'Content-Type': 'multipart/form-data'
                                            }
                                        }).then((response) => {
                                            if (response.status === 201) {
                                                resolve(null)
                                            } else {
                                                throw new Error(JSON.stringify(response))
                                            }
                                        }).catch((e) => {
                                            console.log("Error in sending payload", e)
                                            reject(null)
                                        }).finally(() => {
                                            helpers.setSubmitting(false)
                                        })
                                    })

                                    // Show notification and resolve promise
                                    await showCompleteToast(createNgoPromise, {
                                        error: "Error! Please try again!",
                                        pending: "Please wait...",
                                        success: "Done!"
                                    })
                                } else { // If files validation failed
                                    helpers.setSubmitting(false)
                                }

                            } else { // If NGO is not new
                                /* Submit form only if everything is valid */
                                if (validateFiles()) {
                                    // Find fields that have been changed
                                    const changedFields = {}
                                    for (let fieldName in values) {
                                        if (fieldName !== "verificationPdf" && fieldName !== "image") {
                                            if (values[fieldName] !== initialValues[fieldName]) {
                                                changedFields[fieldName] = values[fieldName]
                                            }
                                        }
                                    }
                                    if (imageFileChanged) {
                                        changedFields["image"] = imageFile
                                    }
                                    if (verificationPdfFileChanged) {
                                        changedFields["verificationPdf"] = verificationPdfFile
                                    }

                                    // Update only if at least one field was changed
                                    if (Object.keys(changedFields).length !== 0) {
                                        // Get form data to send
                                        const formData = createFormData({
                                            ...changedFields,
                                            id: ngoRegistered.id
                                        })

                                        // Create promise that updates Firebase user data (IF NEEDED), and sends payload to api
                                        const editNgoPromise = new Promise(async (resolve, reject) => {
                                            if ("charityEmail" in changedFields) { // Need to change user email
                                                await updateUser("email", values.charityEmail)
                                            }
                                            if ("ownerName" in changedFields) { // Need to change user's display name
                                                await updateUser("name", values.ownerName)
                                            }

                                            // Send payload to API
                                            axios.post("/api/updateNgo", formData, {
                                                headers: {
                                                    'Content-Type': 'multipart/form-data'
                                                }
                                            }).then((response) => {
                                                if (response.status === 200) {
                                                    resolve(null)
                                                } else {
                                                    throw new Error(JSON.stringify(response))
                                                }
                                            }).catch((e) => {
                                                console.log("Error in sending payload", e)
                                                reject(null)
                                            }).finally(() => {
                                                helpers.setSubmitting(false)
                                            })
                                        })

                                        // Show notification and resolve promise
                                        await showCompleteToast(editNgoPromise, {
                                            error: "Error! Please try again!",
                                            pending: "Please wait...",
                                            success: "Done!"
                                        })
                                    }
                                }
                            }
                        }}>
                            {({ values, handleSubmit, setFieldValue, isSubmitting, setFieldTouched }) => (
                                <NgoForm onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

                                    {/* Name */}
                                    <TextfieldFormik name="ownerName" label="Your name" />

                                    {/* Title */}
                                    <TextfieldFormik name="title" label="Organisation name" />

                                    {/* Year of establishment */}
                                    <TextfieldFormik name="yearOfEstablish" label="Year of establishment" inputProps={{
                                        type: "number"
                                    }} />

                                    {/* Contact number */}
                                    <TextfieldFormik name="contact" label="Contact number" inputProps={{
                                        type: "tel"
                                    }} />

                                    {/* NGO email */}
                                    <TextfieldFormik name="charityEmail" label="Email" inputProps={{
                                        type: "email",
                                        disabled: ngoStatus === "NEW_ACCOUNT"
                                    }} />

                                    {/* Description */}
                                    <TextAreaFormik name="description" label="Description" />

                                    {/* Image */}
                                    <FileInputFormik name="image" label="Banner image" inputProps={{
                                        onInput: (e) => {
                                            onImageFileInput(e, ngoStatus === "NEW_ACCOUNT")
                                            setImageFileChanged(true)
                                        },
                                        accept: imageFileTypes.join(", ")
                                    }} fileInfo={{
                                        name: ngoRegistered?.image.alt || imageFile?.name,
                                        sizeInBytes: null
                                    }} />

                                    {/* Categories */}
                                    <RadioButtons name="category" label="Category" valuesAndLabels={ngoCategories.categories.map(({ categoryName, id }) => ({
                                        label: categoryName,
                                        value: categoryName
                                    }))} selectedValue={values.category} />

                                    {/* Verification PDF */}
                                    <FileInputFormik name="verificationPdf" label="Registration document" inputProps={{
                                        onInput: (e) => {
                                            onVerificationPdfFileInput(e, ngoStatus === "NEW_ACCOUNT")
                                            setverificationPdfFileChanged(true)
                                        },
                                        accept: verificationDocFileTypes.join(", ")
                                    }} fileInfo={{
                                        name: ngoRegistered?.verificationPdf?.title || verificationPdfFile?.name,
                                        sizeInBytes: ngoRegistered?.verificationPdf?.size || verificationPdfFile?.size
                                    }} />

                                    {/* Action buttons */}
                                    <Row vCenter style={{
                                        gap: "var(--sp-400)",
                                        justifyContent: "flex-end"
                                    }}>
                                        {/* Go back */}
                                        <LinkNext passHref href="/dashboard"><a>
                                            <Button buttonProps={{
                                                type: "submit"
                                            }}>Go back</Button>
                                        </a></LinkNext>

                                        {/* Submit button */}
                                        <Button disabled={isSubmitting} buttonProps={{
                                            type: "submit"
                                        }}>Submit</Button>
                                    </Row>

                                </NgoForm>
                            )}
                        </Formik>

                    </SectionBox>


                </MaxWidthContainer>
            }
            <Footer />
        </>
    )
}

// Styles
const NgoForm = styled.form`
    ${({ theme }) => css`
        width: 100%;
        margin-top: var(--sp-400);

        & > * + * {
            margin-top: var(--sp-400);
        }
    `}
`