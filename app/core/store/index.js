'use strict';

import {AsyncStorage} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import reducer from '../../reducers';
import {persistStore, autoRehydrate} from 'redux-persist'
import thunk from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension'

import {openLaunchScreen, openCreateTaskScreen} from '../../actions/router';

const persistingOptions = {
    storage: AsyncStorage,
    whitelist: [],
};

const middlewares = [thunk];
const enhancer = composeWithDevTools({})(
    applyMiddleware(...middlewares),
    autoRehydrate()
);

export default function configureStore(initialState) {
    const store = createStore(reducer, initialState, enhancer);
    persistStore(store, persistingOptions, () => store.dispatch(openLaunchScreen()));

    if (module.hot) {
        module.hot.accept(() => {
            store.replaceReducer(reducer);
        })
    }
    return store
}