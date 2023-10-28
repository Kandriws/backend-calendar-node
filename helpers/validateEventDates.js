const validateEventDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
        return false;
    }
    return true;
}

module.exports = {
    validateEventDates
}