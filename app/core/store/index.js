'use strict';

import {AsyncStorage} from 'react-native';
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from '../../reducers';
import {persistStore, autoRehydrate} from 'redux-persist'
import thunk from 'redux-thunk';

import {openLaunchScreen} from '../../actions/router';

const persistingOptions = {
    storage: AsyncStorage,
    whitelist: [],
};

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        autoRehydrate()
    )
);

persistStore(store, persistingOptions, () => store.dispatch(openLaunchScreen()));

export default store;
