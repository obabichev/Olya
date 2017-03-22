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


import * as screenConstans from '../../constatns/screens';
import SplashScreen from '../SplashScreen';
import Launch from '../LaunchScreen';
import TasksList from '../TasksList';
import CreateTaskScreen from '../CreateTaskScreen';

import {push, pop} from '../../actions/router';


class MainRouter extends Component {

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction)
    }

    _handleBackAction = () => {
        if (this.props.navigation.index === 0) {
            return false
        }
        this.props.popRoute();
        return true
    };

    _renderScene(props) {
        const {route} = props.scene;
        switch (route.key) {
            case screenConstans.SPLASH_SCREEN:
                return <SplashScreen/>;
            case screenConstans.TASKS_LIST_SCREEN:
                return <TasksList date={new Date()}/>;
            case screenConstans.LAUNCH_SCREEN:
                return <Launch/>;
            case screenConstans.CREATE_TASK_SCREEN:
                return <CreateTaskScreen/>;
            default:
                return null;
        }
    }

    render() {
        return (
            <NavigationCardStack
                direction='vertical'
                navigationState={this.props.navigation}
                renderScene={this._renderScene}/>
        )
    }
}

const mapStateToProps = state => {
    return {
        navigation: state.router,
    }
};

const mapDispatchToProps = dispatch => ({
    pushRoute: (route) => dispatch(push(route)),
    popRoute: () => dispatch(pop())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainRouter);