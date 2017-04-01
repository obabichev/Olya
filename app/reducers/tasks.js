'use strict';

import * as tasksTypes from '../constatns/tasks';
import _ from 'lodash';

const initialState = {};

const tasks = (state = initialState, action) => {
    switch (action.type) {
        case tasksTypes.FETCH_TASKS_LIST_ACTION:
            const {tasks} = action;
            return {
                ...state,
                ..._.zipObject(tasks.map(task => task._id), tasks)
            };
        case tasksTypes.UPDATE_TASK_ACTION:
        case tasksTypes.ADD_TASK_ACTION:
            const {task} = action;
            console.log(task);
            return {
                ...state,
                [task._id]: task
            };
        default:
            return state;
    }
};

export default tasks;