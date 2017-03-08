'use strict';

const _ = require('lodash');

const BASE_URL = 'http://192.168.1.46:3000';

const concatParams = params => _.keys(params).map(key => `${key}=${params[key]}`).join('&');

export function genUrl(service, params = {}) {
    return `${BASE_URL}${service}?${concatParams(params)}`;
}

