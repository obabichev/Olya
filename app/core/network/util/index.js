'use strict';

const _ = require('lodash');

// const BASE_URL = 'http://192.168.1.46:3000';

const BASE_URL = 'http://ec2-35-157-112-194.eu-central-1.compute.amazonaws.com/olya';

const concatParams = params => _.keys(params).map(key => `${key}=${params[key]}`).join('&');

export function genUrl(service, params = {}) {
    return `${BASE_URL}${service}?${concatParams(params)}`;
}

