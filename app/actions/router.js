'use strict';

import * as routerConstants from '../constatns/router';
import * as screenConstants from '../constatns/screens';

export const openNavBar = () => ({
    type: routerConstants.OPEN_NAV_BAR
});

export const closeNavBar = () => ({
    type: routerConstants.CLOSE_NAV_BAR
});

export const openLaunchScreen = () => ({
    type: routerConstants.OPEN_LAUNCH_SCREEN,
    route: screenConstants.LAUNCH_SCREEN
});

export const openTasksListScreen = () => ({
    type: routerConstants.OPEN_TASKS_LIST_SCREEN,
    route: screenConstants.TASKS_LIST_SCREEN
});