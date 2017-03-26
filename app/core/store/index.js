'use strict';

import {AsyncStorage} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import reducer from '../../reducers';
import {persistStore, autoRehydrate} from 'redux-persist'
import thunk from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension'

import {reset} from '../../actions/router';
import {LAUNCH_SCREEN} from '../../constatns/screens';

const route = {
    key: LAUNCH_SCREEN,
    title: 'Launch'
};

const persistingOptions = {
    storage: AsyncStorage,
    whitelist: ['tasks'],
};

const middlewares = [thunk];
const enhancer = composeWithDevTools({})(
    applyMiddleware(...middlewares),
    autoRehydrate()
);

export default function configureStore(initialState) {
    const store = createStore(reducer, initialState, enhancer);
    persistStore(store, persistingOptions, () => store.dispatch(reset(route)));

    if (module.hot) {
        module.hot.accept(() => {
            store.replaceReducer(reducer);
        })
    }
    return store
}