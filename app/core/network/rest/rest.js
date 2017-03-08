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
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body ? JSON.stringify(body) : null
    });

    // await sleep(5000);

    console.log(`POST: ${path}, status:${result.status}`);
    return result.json();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}