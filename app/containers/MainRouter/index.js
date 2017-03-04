'use strict';

import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';

import {SPLASH_SCREEN, LAUNCH_SCREEN} from '../../constatns/screens';
import SplashScreen from '../SplashScreen';
import Launch from '../LaunchScreen';

class MainRouter extends Component {

    render() {
        switch (this.props.route) {
            case SPLASH_SCREEN:
                return <SplashScreen/>;
            case LAUNCH_SCREEN:
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