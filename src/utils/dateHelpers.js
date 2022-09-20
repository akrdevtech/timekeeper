const createDate = (date = new Date(), days = 0, months = 0, years = 0) => {
    date.setDate(date.getDate() + days);
    date.setMonth(date.getMonth() + months);
    date.setFullYear(date.getFullYear() + years);
    return date;
}
const monthNames = [
    { full: "January", part: "Jan" },
    { full: "February", part: "Feb" },
    { full: "March", part: "Mar" },
    { full: "April", part: "Apr" },
    { full: "May", part: "May" },
    { full: "June", part: "Jun" },
    { full: "July", part: "Jul" },
    { full: "August", part: "Aug" },
    { full: "September", part: "Sep" },
    { full: "October", part: "Oct" },
    { full: "November", part: "Nov" },
    { full: "December", part: "Dec" },
];

const formatAsPartDate = (thisDate = new Date()) => {
    const month = monthNames[thisDate.getMonth()].part;
    const day = thisDate.getDate();
    const year = thisDate.getFullYear();
    return `${month} ${day < 10 ? `0${day}` : day}, ${year}`;
}


const getMonthName = (index) => {
    return monthNames[index];
}
const dateHelpers = {
    createDate,
    formatAsPartDate,
    getMonthName
}


export default dateHelpers;