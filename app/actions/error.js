'use strict';

import * as errorTypes from '../constatns/error';

export const errorAction = error => ({
    type: errorTypes.ERROR_ACTION,
    error: error
});
