'use strict';

import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';

import {
    BackAndroid,
    NavigationExperimental
} from 'react-native';
const {
    CardStack: NavigationCardStack
} = NavigationExperimental;


import * as screenConstans from '../../../constatns/screens';
import SplashScreen from '../../screens/SplashScreen';
import Launch from '../../screens/LaunchScreen';
import TasksList from '../../screens/TasksList';
import CreateTaskScreen from '../../screens/CreateTaskScreen';
import TaskDetailsScreen from '../../screens/TaskDetailsScreen';

import {push, pop} from '../../../actions/router';


class MainRouter extends Component {

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction)
    }

    _handleBackAction = () => {
        if (this.props.index === 0) {
            return false
        }
        this.props.popRoute();
        return true
    };

    _renderScene() {
        const {scene} = this.props;
        switch (scene.key) {
            case screenConstans.SPLASH_SCREEN:
                return <SplashScreen/>;
            case screenConstans.TASKS_LIST_SCREEN:
                return <TasksList/>;
            case screenConstans.LAUNCH_SCREEN:
                return <Launch/>;
            case screenConstans.CREATE_TASK_SCREEN:
                return <CreateTaskScreen/>;
            case screenConstans.TASK_DETAILS_SCREEN:
                return <TaskDetailsScreen/>;
            default:
                return null;
        }
    }

    render() {
        return this._renderScene();
    }
}

const mapStateToProps = state => {
    return {
        scene: state.router.scene,
        index: state.router.routes.length - 1
    }
};

const mapDispatchToProps = dispatch => ({
    popRoute: () => dispatch(pop())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainRouter);