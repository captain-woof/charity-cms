import Loader from "../components/atoms/loader"
import { useRouter} from 'next/router'
import { useEffect } from "react"

export default function TestPage() {
    const router = useRouter()

    useEffect(() => {
        if (process.env.NODE_ENV === "production") {
            router.replace("/")
        }
    }, [router])

    if (process.env.NODE_ENV === "production") {
        return (
            <></>
        )
    }

    return (
        <Loader />
    )
}