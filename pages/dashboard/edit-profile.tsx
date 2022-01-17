import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { parseCookies } from "nookies"
import { verifyIdToken } from "../../utils/auth-server"
import EditProfile from "../../components/containers/dashboard/edit-profile"

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const cookies = parseCookies(ctx)
    if (cookies.token) {
        // Check if user is logged in (Server side)
        const { status } = await verifyIdToken(cookies.token)
        if (!status) {
            return {
                redirect: {
                    destination: '/auth/login',
                    permanent: false,
                }
            }
        } else {
            return {
                props: {}
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

export default function EditProfilePage() {
    return (
        <EditProfile />
    )
}