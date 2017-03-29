'use strict';

import {Alert} from 'react-native';

import * as errorTypes from '../constatns/error';

import {clearTokens} from '../actions/auth';
import {reset} from '../actions/router';
import * as screens from '../constatns/screens';

const errorHandler = store => next => action => {
    switch (action.type) {
        case errorTypes.ERROR_ACTION:
            const {error} = action;
            console.log(error);
            if (error.status) {
                handleNetworkProblem(error.status, store);
                break;
            }
            defaultErrorNotification(action.error);
            break;
        default:
            next(action);
    }
};

const handleNetworkProblem = (status, store) => {
    switch (status) {
        case 403:
            store.dispatch(clearTokens());
            store.dispatch(reset({key: screens.LAUNCH_SCREEN}));
            break;
        default:
            Alert.alert(`Network problem (${status})`);
    }
};

const defaultErrorNotification = error => {
    Alert.alert(`Error ${error.message}`);
};

export default errorHandler;