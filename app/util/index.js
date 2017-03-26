'use strict';

export function dateToDayid(date) {
    return `${date.getDate()}:${date.getMonth()}:${date.getFullYear()}`;
}

export function isTheSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getYear() === date2.getYear();
}