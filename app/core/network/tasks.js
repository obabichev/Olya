'use strict';

import {get, post, put} from './rest/rest';
import {genUrl} from './util';


export async function fetchTasksList() {
    let result = await get(genUrl(`/tasks`));
    return result;
}

export async function createTaskRequest(task) {
    let result = await post(genUrl(`/task`), task);
    return result;
}

export async function updateTaskRequest(task) {
    let result = await put(genUrl(`/task/${task._id}`), task);
    return result;
}


