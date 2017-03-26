'use strict';

import React, {Component} from 'react';
import {AsyncStorage, View} from 'react-native';
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
import {hideModal} from '../../../actions/modal';

import ModalRoot from '../ModalRoot';

const screensMap = {
    [screenConstans.SPLASH_SCREEN]: SplashScreen,
    [screenConstans.TASKS_LIST_SCREEN]: TasksList,
    [screenConstans.LAUNCH_SCREEN]: Launch,
    [screenConstans.CREATE_TASK_SCREEN]: CreateTaskScreen,
    [screenConstans.TASK_DETAILS_SCREEN]: TaskDetailsScreen
};

class MainRouter extends Component {

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction)
    }

    _handleBackAction = () => {
        if (this.props.modalType) {
            this.props.hideModal();
            return true;
        }
        if (this.props.index === 0) {
            return false
        }
        this.props.popRoute();
        return true
    };


    _renderScene() {
        const {scene} = this.props;

        let TargetScreen = screensMap[scene.key];

        return (<View style={{flex:1}}>
            <TargetScreen/>
            <ModalRoot/>
        </View>);
    }


    render() {
        return this._renderScene();
    }
}

const mapStateToProps = state => {
    return {
        scene: state.router.scene,
        index: state.router.routes.length - 1,
        modalType: state.modal.modalType
    }
};

const mapDispatchToProps = dispatch => ({
    popRoute: () => dispatch(pop()),
    hideModal: () => dispatch(hideModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainRouter);