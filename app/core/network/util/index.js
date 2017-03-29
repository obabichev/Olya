'use strict';

const _ = require('lodash');

import store from '../../store';


const BASE_URL = 'http://ec2-35-157-112-194.eu-central-1.compute.amazonaws.com/olya/api';

const concatParams = params => _.keys(params).map(key => `${key}=${params[key]}`).join('&');

export function genUrl(service, params = {}) {
    return `${BASE_URL}${service}?${concatParams(params)}`;
}

export const getAccessToken = () => store.getState().auth.accessToken;

export const getRefreshToken = () => store.getState().auth.refreshToken;
