'use strict';

import {get} from './rest/rest';
import {genUrl} from './util';


export async function fetchTasksList() {
    let result = await get(genUrl(`/task`));
    return result.data;
}