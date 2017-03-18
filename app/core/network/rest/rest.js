'use strict';

import {validateResponseBody, validateResponseStatus} from '../validator';

export async function get(path) {

    let result = await fetch(path, {
        method: 'GET'
    });
    await sleep(2000);

    console.log(`GET: ${path}, status:${result.status}`);

    validateResponseStatus(result.status);

    let resultBody = await result.json();
    validateResponseBody(resultBody);

    return resultBody.data;
}

export async function post(path, body) {

    let result = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : ''
    });

    // await sleep(5000);

    console.log(`POST: ${path}, status:${result.status}`);

    validateResponseStatus(result.status);

    let resultBody = await result.json();
    validateResponseBody(resultBody);

    return resultBody.data;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}