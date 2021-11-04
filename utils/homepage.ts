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