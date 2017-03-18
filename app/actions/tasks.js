'use strict';

import * as tasksTypes from '../constatns/tasks';

import {fetchTasksList, createTaskRequest} from '../core/network/tasks';

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

const addTask = (task, dayid) => ({
    type: tasksTypes.ADD_TASK_ACTION,
    dayid: dayid,
    task: task
});

export const createTask = task => {
    return dispatch => createTaskRequest(task).then(
        result => dispatch(addTask(task, util.dateToDayid(new Date(task.date.start)))),
        error => console.log(`Error ${error.message}`)
    );
};