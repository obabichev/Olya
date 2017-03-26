'use strict';

import * as types from '../constatns/modal';

export const showModel = (modelType, modalProps) => ({
    type: types.SHOW_MODAL,
    modalType: modelType,
    modalProps: modalProps
});

