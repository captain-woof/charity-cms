import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { parseCookies } from "nookies"
import { verifyIdToken } from "../../utils/auth-server"
import Dashboard from "../../components/containers/dashboard"

// Check if user is logged in (Server side)
export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const cookies = parseCookies(ctx)
    if (cookies.token) {
        const { status } = await verifyIdToken(cookies.token)
        if (!status) {
            return {
                redirect: {
                    destination: '/auth/login',
                    permanent: false,
                }
            }
        }
    } else {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            }
        }
    }
}

export default function DashboardPage() {
    return (
        <Dashboard />
    )
}