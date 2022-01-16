import axios from "axios";
import { Ngo } from "../types/ngo";
import { toast } from "react-toastify"

declare global {
    interface Window {
        Razorpay: any
    }
}

export const makeDonation = (ngo: Ngo, amount: string) => {
    if ("Razorpay" in window) {
        const razorpay = window.Razorpay({
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            name: "Charity CMS",
            description: `Donate to ${ngo.title}`,
            amount: `${Math.round(parseFloat(amount) * 100)}`, // Getting nearest paisa
            image: null,
            handler: async function (response) {
                // Store transaction on Contentful
                const toastId = toast.loading("Processing...")
                try {
                    const resp = await axios.post("/api/createTransaction", {
                        slug: ngo.ngoSlug,
                        id: response.razorpay_payment_id,
                        amount
                    })
                    if (resp.status === 201) {
                        // Success
                        toast.update(toastId, { render: "Donation successful!", type: "info", isLoading: false })
                    } else {
                        throw new Error(resp.data)
                    }
                } catch (e) {
                    // Error
                    console.log("Error in payment", e)
                    toast.update(toastId, { render: "Donation failed!", type: "error", isLoading: false })
                } finally {
                    setTimeout(() => {
                        toast.dismiss(toastId)
                    }, 4000)
                }
            },
            theme: {
                "color": "#2596be"
            },
            notes: {
                "donated-to": ngo.title,
                "donated-amount": amount
            }
        })
        razorpay.open()
    }
}