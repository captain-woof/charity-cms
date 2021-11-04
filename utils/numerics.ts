export const getNumOfDigits = (num: number): number => (`${num}`.length)

export const roundOffIndian = (num: number): string => {
    let numOfDigits = getNumOfDigits(num)
    if (numOfDigits > 7) {
        return `${(num / 10000000).toPrecision(3)}Cr`
    } else if (numOfDigits > 5) {
        return `${(num / 100000).toPrecision(3)}L`
    } else if (numOfDigits > 3) {
        return `${(num / 1000).toPrecision(3)}K`
    } else {
        return `${num}`
    }
}