const getDateOneWeekLater = () => {
    // Get the current date
    const currentDate = new Date();

    // Add 7 days to the current date
    const oneWeekLater = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    return oneWeekLater;
}

// Formatting date
const formatDate = (date: string | number | Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');  // getMonth is zero-based, so we add 1
    const day = String(d.getDate()).padStart(2, '0');  // getDate gives the day of the month
    return `${year}-${month}-${day}`;
};


export { getDateOneWeekLater, formatDate }