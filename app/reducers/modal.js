'use strict';

import * as modalConstants from '../constatns/modal';

const initialState = {
    modalType: null,
    modalProps: {}
};

const modal = (state = initialState, action) => {
    switch (action.type) {
        case modalConstants.SHOW_MODAL:
            return {
                modalType: action.modalType,
                modalProps: action.modalProps
            };
        case modalConstants.HIDE_MODAL:
            return initialState;
        default:
            return state
    }
};

export default modal;