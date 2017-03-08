'use strict';

import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';

import * as screenConstans from '../../constatns/screens';
import SplashScreen from '../SplashScreen';
import Launch from '../LaunchScreen';
import TasksList from '../TasksList';

class MainRouter extends Component {

    render() {
        switch (this.props.route) {
            case screenConstans.SPLASH_SCREEN:
                return <SplashScreen/>;
            case screenConstans.TASKS_LIST_SCREEN:
                return <TasksList/>;
            case screenConstans.LAUNCH_SCREEN:
                return <Launch/>;
            default:
                return null;
        }
    }
}

const mapStateToProps = state => {
    return {
        route: state.router.route
    }
};

export default connect(mapStateToProps)(MainRouter);