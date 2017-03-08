'use strict';

export function dateToDayid(date) {
    return `${date.getDate()}:${date.getMonth()}:${date.getFullYear()}`;
}