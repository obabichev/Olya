'use strict';

import {combineReducers} from 'redux';

import router from './router';
import tasks from './tasks';


const reducers = combineReducers({
    router,
    tasks,
});

export default reducers;