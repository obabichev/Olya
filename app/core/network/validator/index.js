'use strict';

export const validateResponseStatus = status => {
    switch (status) {
        case 200:
            return;
        default:
            throw {
                message: `Network problem (${status})`
            }
    }
};

export const validateResponseBody = body => {
    if (body.status === 'ok') {
        return;
    }

    throw {
        message: body.data
    }
};