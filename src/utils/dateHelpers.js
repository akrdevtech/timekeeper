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

const dateWithoutTimeIsEqual = function (date1, date2) {
    const d1 = new Date(date1);
    d1.setHours(0, 0, 0, 0);
    const d2 = new Date(date2);
    d2.setHours(0, 0, 0, 0);
    return d1 === d2;
}

const formatLocaleTimeString = (date = new Date()) => {
    const localeTimeString = new Date(date).toLocaleTimeString();
    const [hours, minutes, secondsPart] = localeTimeString.split(':');
    let newHours = Number(hours) < 10 ? `0${hours}` : hours;
    let newMinutes = Number(minutes) < 10 ? `0${minutes}` : minutes;
    const [seconds,meridiem] = secondsPart.split(" ");
    return `${newHours} : ${newMinutes} ${meridiem.toLowerCase()}`;
}

const getMonthName = (index) => {
    return monthNames[index];
}
const dateHelpers = {
    createDate,
    formatAsPartDate,
    getMonthName,
    dateWithoutTimeIsEqual,
    formatLocaleTimeString,
}


export default dateHelpers;