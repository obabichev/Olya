'use strict';

import {
    OPEN_LAUNCH_SCREEN,
    START_DOWNLOADING,
    STOP_DOWNLOADING,
    OPEN_NAV_BAR,
    CLOSE_NAV_BAR
} from '../constatns/router';
import {SPLASH_SCREEN, LAUNCH_SCREEN} from '../constatns/screens';

const initialRoute = {
    route: SPLASH_SCREEN,
    downloading: false,
    openNavBar: false
};

const router = (state = initialRoute, action) => {
    if (action.route) {
        console.log(`Switch to ${action.route}`);
    }
    switch (action.type) {
        case OPEN_LAUNCH_SCREEN:
            return {
                ...state,
                route: action.route
            };

        case START_DOWNLOADING:
            return {
                ...state,
                downloading: true,
            };
        case STOP_DOWNLOADING:
            return {
                ...state,
                downloading: false,
            };
        case OPEN_NAV_BAR:
            return {
                ...state,
                openNavBar: true,
            };
        case CLOSE_NAV_BAR:
            return {
                ...state,
                openNavBar: false,
            };
        default:
            return state;
    }
};

export default router;