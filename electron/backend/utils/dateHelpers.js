module.exports = () => {
    const getStartAndEndOfDay = (date = new Date()) => {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);

        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        return {
            start,
            end
        }
    }
    return {
        getStartAndEndOfDay
    }
}