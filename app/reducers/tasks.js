'use strict';

const testData = require('../../json/tasks.json');

const initialState = {
    tasks: testData
};

const tasks = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default tasks;