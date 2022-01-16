import { useEffect, useState } from "react"
import { getAllNgo } from "../lib/contentful"
import { showToast } from "../lib/toastify"
import { Ngo, NgoRegistrationType } from "../types/ngo"
import { useUser } from "./auth"

export const useRegisteredNgo = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const user = useUser()
    const [ngoRegistered, setNgoRegistered] = useState<Ngo>(null)
    const [ngoStatus, setNgoStatus] = useState<NgoRegistrationType>(null)

    // Function to fetch NGO data associated with the current account
    useEffect(() => {
        (async () => {
            try {
                if (!!user) { // If account has been fetched from Firebase
                    setLoading(true)
                    const ngo = await getAllNgo({
                        userEmail: user.email
                    })
                    // If no ngo came back, this is a new account
                    // If ngo came back, check the verified flag
                    if (ngo.total === 0) {
                        setNgoStatus("NEW_ACCOUNT")
                    } else if (!ngo.ngos[0].isVerified) {
                        setNgoStatus("VERIFICATION_PENDING")
                        setNgoRegistered(ngo.ngos[0])
                    } else if (ngo.ngos[0].isVerified) {
                        setNgoStatus("VERIFIED")
                        setNgoRegistered(ngo.ngos[0])
                    }
                }
            } catch (e) {
                console.log("Error in fetching", e)
                showToast("Error in fetching, please login again!", "error")
            } finally {
                setLoading(false)
            }
        })()
    }, [user])

    // Return stuff
    return {
        loading,
        ngoRegistered,
        ngoStatus
    }
}