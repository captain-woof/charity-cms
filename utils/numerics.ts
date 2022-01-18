export const getNumOfDigits = (num: number): number => {
    let numbers = `${num}`.split(".");
    return numbers[0].length;
};

export const roundOffIndian = (num: number): string => {
    let numOfDigits = getNumOfDigits(num);
    if (numOfDigits > 7) {
        return `${(num / 10000000).toPrecision(3)}Cr`;
    } else if (numOfDigits > 5) {
        return `${(num / 100000).toPrecision(3)}L`;
    } else if (numOfDigits > 3) {
        return `${(num / 1000).toPrecision(3)}K`;
    } else {
        return `${num}`;
    }
};

export const sumAllNumbersInList = (numbers: Array<number>): number => {
    return numbers.reduce((total, current) => total + current, 0);
};

export const convertMbToBytes = (sizeInMb: number): number => {
    return sizeInMb * 1024 * 1024;
};

export const convertBytesToMb = (sizeInBytes: number): number => {
    return sizeInBytes / (1024 * 1024);
};
