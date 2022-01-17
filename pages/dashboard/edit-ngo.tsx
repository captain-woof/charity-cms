import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { parseCookies } from "nookies"
import { verifyIdToken } from "../../utils/auth-server"
import EditNgo from "../../components/containers/dashboard/edit-ngo"
import { getCategories } from "../../lib/contentful"
import { CategoryList } from "../../types/ngo"

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
            // Get NGO categories
            const ngoCategories = await getCategories()

            return {
                props: {
                    ngoCategories
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

// Page component
interface EditNgoPage {
    ngoCategories: CategoryList
}

export default function EditNgoPage({ ngoCategories }: EditNgoPage) {
    return (
        <EditNgo ngoCategories={ngoCategories} />
    )
}