'use strict';

import * as tasksTypes from '../constatns/tasks';

import {fetchTasksList} from '../core/network/tasks';

import * as util from '../util';

const updateTasks = (tasks, dayid) => ({
    type: tasksTypes.FETCH_TASKS_LIST_ACTION,
    dayid: dayid,
    tasks: tasks
});

export const uploadTasks = () => {
    return dispatch => {
        return Promise.resolve()
            .then(() => dispatch(fetchTasksListAction()));
    };
};

const fetchTasksListAction = () => {
    let date = new Date();
    return dispatch => fetchTasksList().then(
        tasks => dispatch(updateTasks(tasks, util.dateToDayid(date))),
        error => console.log(`Error ${error.message}`)
    );
};