const millisecondsInSecond = () => 1000

const secondsInMinute = () => 60

const minutesInHour = () => 60

const hoursInDay = () => 24

const millisecondsInDay = () => millisecondsInSecond() * secondsInMinute() * minutesInHour() * hoursInDay()

const numDaysBetweenDates = (startDate, endDate) => (endDate - startDate) / millisecondsInDay();

const isAfterDate = (dateA, dateB) => dateA > dateB

const isBeforeDate = (dateA, dateB) => dateA < dateB

const isSameDate = (dateA, dateB) => dateA.toISOString() === dateB.toISOString();

// returns most recent date from array of dates
const getMostRecentDate = (...dates) => new Date(Math.max.apply(null, ...dates));

// returns earliest date from array of dates
const getEarliestDate = (...dates) => new Date(Math.min.apply(null, ...dates));

// returns tomorrow's date
const tomorrow = () => {
    const t = new Date();

    t.setDate(t.getDate() + 1);
    return t.toISOString().split('T')[0];
};
