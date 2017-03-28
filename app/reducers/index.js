'use strict';

import {combineReducers} from 'redux';

import router from './router';
import tasks from './tasks';
import modal from './modal';
import auth from './auth';

const reducers = combineReducers({
    router,
    tasks,
    modal,
    auth
});

export default reducers;