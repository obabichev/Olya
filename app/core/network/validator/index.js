'use strict';

export const validateResponseStatus = status => {
    switch (status) {
        case 200:
            return;
        default:
            throw {
                status: status,
                message: `Network problem (${status})`
            }
    }
};

export const validateResponseBody = body => {
    if (body.status === 'ok') {
        return;
    }

    throw {
        message: body.data.message
    }
};