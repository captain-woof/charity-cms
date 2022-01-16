// Function to get date using offset num of days
export const getDateFromToday = (numOfDaysOffset: number): Date => {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + numOfDaysOffset)
    return currentDate
}