'use strict';

import {validateResponseBody, validateResponseStatus} from '../validator';

import {getAccessToken} from '../util';

import store from '../../store';
import {updateAccessToken} from '../../../actions/auth';
import {fetchAccessToken} from '../auth';


export async function get(path) {

    const request = async(token) => await fetch(path, {
        method: 'GET',
        headers: {
            "X-Access-Token": token
        }
    });

    let result = await request(getAccessToken());

    if (result.status === 403) {
        let token = await updateToken();
        result = await request(token);
    }

    console.log(`GET: ${path}, status:${result.status}`);

    validateResponseStatus(result.status);

    let resultBody = await result.json();
    validateResponseBody(resultBody);

    return resultBody.data;
}

export async function post(path, body) {
    return requestWithBody(path, body, 'POST')
}

export async function put(path, body) {
    return requestWithBody(path, body, 'PUT')
}

export async function requestWithBody(path, body, method) {

    let request = async token => await fetch(path, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            "X-Access-Token": token
        },
        body: body ? JSON.stringify(body) : ''
    });

    let result = await request(getAccessToken());

    if (result.status === 403) {
        let token = await updateToken();
        result = await request(token);
    }

    console.log(`${method}: ${path}, status:${result.status}`);

    validateResponseStatus(result.status);

    let resultBody = await result.json();
    validateResponseBody(resultBody);

    return resultBody.data;
}


const updateToken = async() => {
    let accessToken = await fetchAccessToken(store.getState().auth.refreshToken);
    store.dispatch(updateAccessToken(accessToken.token));
    return accessToken.token;
};