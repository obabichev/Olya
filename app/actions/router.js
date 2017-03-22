'use strict';

import * as routerConstants from '../constatns/router';

export const push = route => ({
    type: routerConstants.PUSH_ROUTE,
    route
});

export const pop = () => ({
    type: routerConstants.POP_ROUTE
});

export const reset = route => ({
    type: routerConstants.RESET_ROUTE,
    route
});


export const openNavBar = () => ({
    type: routerConstants.OPEN_NAV_BAR
});

export const closeNavBar = () => ({
    type: routerConstants.CLOSE_NAV_BAR
});

export const startDownloading = () => ({
    type: routerConstants.START_DOWNLOADING,
    downloading: true
});

export const stopDownloading = () => ({
    type: routerConstants.STOP_DOWNLOADING,
    downloading: false
});