'use strict';

import {combineReducers} from 'redux';

import router from './router';
import tasks from './tasks';
import modal from './modal';

const reducers = combineReducers({
    router,
    tasks,
    modal
});

export default reducers;