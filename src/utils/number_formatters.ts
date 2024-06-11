/**
 * Formats a number with commas as thousands separators.
 * 
 * @param num - The number to format.
 * @returns A string representation of the number with comma separators.
 */
const formatNumberWithCommas = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export { formatNumberWithCommas }