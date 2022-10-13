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

    const getStartOfMonth = (date = new Date()) => {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    const getEndOfMonth = (date = new Date()) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }

    const getStartAndEndOfMonth = (date = new Date()) => {
        const start = getStartOfMonth(date);
        const end = getEndOfMonth(date);
        return {
            start,
            end
        }
    }
    return {
        getStartAndEndOfDay,
        getStartOfMonth,
        getEndOfMonth,
        getStartAndEndOfMonth,
    }
}