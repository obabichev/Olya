'use strict';

import * as types from '../constatns/modal';

export const showModal = (modelType, modalProps) => ({
    type: types.SHOW_MODAL,
    modalType: modelType,
    modalProps: modalProps
});

export const hideModal = () => ({
    type: types.HIDE_MODAL
});
