import { getProxiedUrl } from "./image-proxy"

// Function to get stats for homepage
interface IHomepageStats {
    totalDonationsAmount: number
    totalNgos: number
    totalCategories: number
    totalDonationsNum: number
}
export const getHomepageStats = async (): Promise<IHomepageStats> => {
    // TODO: Implement logic to get data from Contentful

    // Dummy Data
    return {
        totalCategories: 8,
        totalDonationsAmount: 120000,
        totalDonationsNum: 1203,
        totalNgos: 12
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

export const getHomepageOrgs = async (): Promise<IHomepageOrgs> => {
    // TODO: Implement logic to get data from Contentful

    // Dummy data
    return (new Array(8) as IHomepageOrgs).fill({
        orgName: "Demo Org",
        orgUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        orgLogoUrl: getProxiedUrl('https://unsplash.it/250/250') 
    })
}