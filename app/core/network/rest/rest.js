'use strict';

export async function get(path) {

    let result = await fetch(path, {
        method: 'GET'
    });
    await sleep(2000);

    console.log(`GET: ${path}, status:${result.status}`);

    return result.json();
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

    let resultJson = await result.json();

    if (resultJson.status !== 'ok') {
        throw {message: JSON.stringify(resultJson)};
    }

    return resultJson;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}