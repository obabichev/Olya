'use strict';

import {fetchRefreshToken} from '../core/network/auth'
import {reset} from '../actions/router';
import {errorAction} from '../actions/error';
import * as screens from '../constatns/screens';

import * as authTypes from '../constatns/auth'

export const tryFetchRefreshToken = credentionals => dispatch => {

    fetchRefreshToken(credentionals)
        .then(refreshToken => dispatch(updateRefreshToken(refreshToken.token)))
        .then(() => dispatch(reset({key: screens.LAUNCH_SCREEN})))
        .catch(err => dispatch(errorAction(err)))
};

export const updateRefreshToken = token => ({
    type: authTypes.UPDATE_REFRESH_TOKEN,
    token
});

export const updateAccessToken = token => ({
    type: authTypes.UPDATE_ACCESS_TOKEN,
    token
});

export const clearTokens = () => ({
    type: authTypes.CLEAR_COOKIE
});