'use strict';

import {get, post} from './rest/rest';
import {genUrl} from './util';


export async function fetchTasksList() {
    let result = await get(genUrl(`/tasks`));
    return result.data;
}

export async function createTaskRequest(task) {
    let result = await post(genUrl(`/task`), task);
    return result;
}

