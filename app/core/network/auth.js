'use strict';

import {get, post} from './rest/rest';
import {genUrl} from './util';

export async function fetchRefreshToken(credentionals) {
    let result = await post(genUrl(`/auth`), credentionals);
    return result;
}

export async function fetchAccessToken(refreshToken) {
    let result = await post(genUrl(`/refresh`), {refresh_token: refreshToken});
    return result;
}
