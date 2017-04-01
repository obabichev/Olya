'use strict';

import {Alert} from 'react-native';

import {pop, startDownloading, stopDownloading} from './router'
import * as tasksTypes from '../constatns/tasks';

import {fetchTasksList, createTaskRequest, updateTaskRequest} from '../core/network/tasks';

import {errorAction} from './error';

import * as util from '../util';

const updateTasks = (tasks, dayid) => ({
    type: tasksTypes.FETCH_TASKS_LIST_ACTION,
    dayid: dayid,
    tasks: tasks
});

export const uploadTasks = () => {
    return dispatch => {
        return Promise.resolve()
            .then(() => dispatch(startDownloading()))
            .then(() => dispatch(fetchTasksListAction()))
            .then(() => dispatch(stopDownloading()))
    };
};

const fetchTasksListAction = () => {
    let date = new Date();
    return dispatch => fetchTasksList().then(
        tasks => dispatch(updateTasks(tasks, util.dateToDayid(date))),
        error => dispatch(errorAction(error))
    );
};

export const createTask = task => dispatch => Promise.resolve()
    .then(() => dispatch(startDownloading()))
    .then(() => dispatch(createTaskCall(task)))
    .then(() => dispatch(pop()))
    .then(() => dispatch(stopDownloading()));

export const createTaskCall = task => {
    return dispatch => createTaskRequest(task).then(
        result => dispatch(addTask(result)),
        error => dispatch(errorAction(error))
    );
};

const addTask = (task) => ({
    type: tasksTypes.ADD_TASK_ACTION,
    task: task
});

export const changeTaskStatus = (task, status) => dispatch => {
    return Promise.resolve()
        .then(() => dispatch(startDownloading()))
        .then(() => dispatch(updateTaskCall({...task, status: status})))
        .then(() => dispatch(stopDownloading()));
};

const updateTaskCall = task => dispatch => {
    return updateTaskRequest(task).then(
        result => dispatch(updateTaskAction(result)),
        error => dispatch(errorAction(error))
    );
};

const updateTaskAction = (task) => ({
    type: tasksTypes.ADD_TASK_ACTION,
    task: task
});