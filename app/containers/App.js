'use strict';

import React, {Component, Navigator} from 'react';
import {Provider} from 'react-redux';
import {Text, View, AsyncStorage} from 'react-native';


import MainRouter from './MainRouter';
import store from '../core/store';
import NavigationDrawer from './NavigationDrawer';

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <NavigationDrawer children={<MainRouter/>}/>
            </Provider>
        );
    }
}
