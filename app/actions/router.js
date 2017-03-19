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

export const openCreateTaskScreen = () => ({
    type: routerConstants.OPEN_CREATE_TASK_SCREEN,
    route: screenConstants.CREATE_TASK_SCREEN
});

export const startDownloading = () => ({
    type: routerConstants.START_DOWNLOADING,
    downloading: true
});

export const stopDownloading = () => ({
    type: routerConstants.STOP_DOWNLOADING,
    downloading: false
});