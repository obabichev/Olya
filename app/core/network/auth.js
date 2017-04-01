'use strict';

import {get, post} from './rest/rest';
import {genUrl} from './util';

import {validateResponseStatus} from './validator';

export async function fetchRefreshToken(credentionals) {
    let result = await post(genUrl(`/auth`), credentionals);
    return result;
}

export async function fetchAccessToken(refreshToken) {

    let result = await fetch(genUrl(`/refresh`), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({refresh_token: refreshToken})
    });

    validateResponseStatus(result.status);

    let resultBody = await result.json();

    return resultBody.data;
}
