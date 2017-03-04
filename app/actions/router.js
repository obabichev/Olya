'use strict';

import {
    OPEN_LAUNCH_SCREEN,
    START_DOWNLOADING,
    STOP_DOWNLOADING,
    OPEN_NAV_BAR,
    CLOSE_NAV_BAR
} from '../constatns/router';
import {LAUNCH_SCREEN} from '../constatns/screens';

export const openNavBar = () => ({
    type: OPEN_NAV_BAR
});

export const closeNavBar = () => ({
    type: CLOSE_NAV_BAR
});

export const openLaunchScreen = () => ({
    type: OPEN_LAUNCH_SCREEN,
    route: LAUNCH_SCREEN
});