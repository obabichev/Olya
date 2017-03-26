'use strict';

import * as routerConstants from '../constatns/router';
import * as screenConstants from '../constatns/screens';

import _ from 'lodash';

import {NavigationExperimental} from 'react-native'
const {
    StateUtils: NavigationStateUtils
} = NavigationExperimental;

const initScene = {
    key: screenConstants.SPLASH_SCREEN,
    title: 'Home'
};

const initialRoute = {
    scene: initScene,
    routes: [initScene],
    downloading: false,
    openNavBar: false
};


const router = (state = initialRoute, action) => {
    if (action.route) {
        console.log(`Switch to ${action.route.key}`);
    }
    switch (action.type) {
        case routerConstants.PUSH_ROUTE:
            // if (state.routes[state.index].key === (action.route && action.route.key)) return state;
            return {
                ...state,
                scene: action.route,
                routes: _.concat(state.routes, action.route)
            };

        case routerConstants.POP_ROUTE:
            if (state.routes.length === 1) return state;
            let routes = _.dropRight(state.routes);
            return {
                ...state,
                scene: _.last(routes),
                routes: routes
            };

        case routerConstants.RESET_ROUTE:
            return {
                ...state,
                scene: action.route,
                routes: [action.route],
            };
        case routerConstants.REPLACE_LAST:
            routes = _.concat(_.dropRight(state.routes), action.route);
            return {
                ...state,
                scene: _.last(routes),
                routes: routes,
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