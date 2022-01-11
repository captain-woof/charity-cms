import { Ngo } from "../types/ngo";


declare global {
    interface Window {
        Razorpay: any
    }
}

export const makeDonation = (ngo: Ngo, amount: string) => {
    if ("Razorpay" in window) {
        const razorpay = window.Razorpay({
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            name: ngo.title,
            description: `Donate to ${ngo.title}`,
            amount: `${amount}00`,
            handler: function (response) {
                // TODO: STORE THIS IN CONTENTFUL
                //alert(response.razorpay_payment_id);
                console.log("Razorpay payment successful", response)
            },
            theme: {
                "color": "#2596be"
            },
            notes: {
                "donated-to": ngo.title
            }
        })
        razorpay.open()
    }
}