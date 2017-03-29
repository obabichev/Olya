'use strict';

import * as authTypes from '../constatns/auth';

const initState = {
    refreshToken: null,
    accessToken: null,
};

const auth = (state = initState, action) => {
    switch (action.type) {
        case authTypes.UPDATE_REFRESH_TOKEN:
            return {
                ...state,
                refreshToken: action.token
            };
        case authTypes.UPDATE_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.token
            };
        case authTypes.CLEAR_COOKIE:
            return {
                ...state,
                refreshToken: null,
                accessToken: null,
            };
        default:
            return state;
    }
};

export default auth;