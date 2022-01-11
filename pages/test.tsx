import Loader from "../components/atoms/loader"

export async function getStaticProps() {
    if (process.env.NODE_ENV === "production") {
        return {
            redirect: {
                destination: '/',
                permanent: true,
            }
        }
    } else {
        return {
            props: {}
        }
    }
}

export default function TestPage() {
    return (
        <Loader />
    )
}