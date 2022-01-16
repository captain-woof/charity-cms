import { getProxiedUrl } from "./image-proxy"
import { allTransaction,ngoCount,categoryCount, getAllNgo } from "../lib/contentful"
import { Ngos } from "../types/ngo";

// Function to get stats for homepage
interface IHomepageStats {
    totalDonationsAmount: number
    totalNgos: number
    totalCategories: number
    totalDonationsNum: number
}
export const getHomepageStats = async (): Promise<IHomepageStats> => {
    const {totalDonationsNum,totalDonationsAmount} = await allTransaction();
    const {totalNgos} = await ngoCount();
    const { totalCategories } = await categoryCount();

    return {
        totalCategories,
        totalDonationsAmount,
        totalDonationsNum,
        totalNgos
    }
}

// Function to get list of organizationss for homepage
interface IHomepageOrg {
    orgName: string
    orgUrl: string
    orgLogoUrl: string
}
interface IHomepageOrgs extends Array<IHomepageOrg> {
    [index: number]: IHomepageOrg
}

export const getHomepageOrgs = async (): Promise<Ngos> => {
    const ngos = await getAllNgo({ isVerified: "true" })
    return ngos
}