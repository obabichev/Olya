'use strict';

import * as tasksTypes from '../constatns/tasks';


const initialState = {
    tasks: {}
};

const tasks = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case tasksTypes.FETCH_TASKS_LIST_ACTION:
            newState = {...state};
            newState.tasks[action.dayid] = action.tasks;
            return newState;
        case tasksTypes.ADD_TASK_ACTION:
            newState = {...state};
            if (!newState.tasks[action.dayid]){
                newState.tasks[action.dayid] = [];
            }
            newState.tasks[action.dayid].push(action.task);
            return newState;
        default:
            return state;
    }
};

export default tasks;