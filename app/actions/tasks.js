'use strict';

import {Alert} from 'react-native';

import {openTasksListScreen, startDownloading, stopDownloading} from './router'
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
            .then(() => dispatch(startDownloading()))
            .then(() => dispatch(fetchTasksListAction()))
            .then(() => dispatch(stopDownloading()))
    };
};

const fetchTasksListAction = () => {
    let date = new Date();
    return dispatch => fetchTasksList().then(
        tasks => dispatch(updateTasks(tasks, util.dateToDayid(date))),
        error => Alert.alert(`Error ${error.message}`)
    );
};

export const createTask = task => dispatch => Promise.resolve()
    .then(() => dispatch(createTaskCall(task)));

export const createTaskCall = task => {
    return dispatch => createTaskRequest(task).then(
        result => {
            dispatch(addTask(task, util.dateToDayid(new Date(task.date.start))));
            dispatch(openTasksListScreen());
        },
        error => Alert.alert(`Error ${error.message}`)
    );
};

const addTask = (task, dayid) => ({
    type: tasksTypes.ADD_TASK_ACTION,
    dayid: dayid,
    task: task
});