const getDateOneWeekLater = () => {
    // Get the current date
    const currentDate = new Date();

    // Add 7 days to the current date
    const oneWeekLater = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    return oneWeekLater;
}

export { getDateOneWeekLater }