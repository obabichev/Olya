'use strict';

import * as routerConstants from '../constatns/router';
import * as screenConstants from '../constatns/screens';

const initialRoute = {
    route: screenConstants.SPLASH_SCREEN,
    downloading: false,
    openNavBar: false
};

const router = (state = initialRoute, action) => {
    if (action.route) {
        console.log(`Switch to ${action.route}`);
    }
    switch (action.type) {
        case routerConstants.OPEN_LAUNCH_SCREEN:
            return {
                ...state,
                route: action.route
            };
        case routerConstants.OPEN_TASKS_LIST_SCREEN:
            return {
                ...state,
                route: action.route
            };
        case routerConstants.OPEN_CREATE_TASK_SCREEN:
            return {
                ...state,
                route: action.route
            };

        case routerConstants.START_DOWNLOADING:
            return {
                ...state,
                downloading: true,
            };
        case routerConstants.STOP_DOWNLOADING:
            return {
                ...state,
                downloading: false,
            };
        case routerConstants.OPEN_NAV_BAR:
            return {
                ...state,
                openNavBar: true,
            };
        case routerConstants.CLOSE_NAV_BAR:
            return {
                ...state,
                openNavBar: false,
            };
        default:
            return state;
    }
};

export default router;