'use strict';

import * as tasksTypes from '../constatns/tasks';


const initialState = {
    tasks: {}
};

const tasks = (state = initialState, action) => {
    switch (action.type) {
        case tasksTypes.FETCH_TASKS_LIST_ACTION:
            let newState = {...state};
            newState.tasks[action.dayid] = action.tasks;
            return newState;
        default:
            return state;
    }
};

export default tasks;