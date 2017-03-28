'use strict';

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

import {reset} from '../../../actions/router';
import * as screens from '../../../constatns/screens';

class LaunchScreen extends Component {

    componentDidMount() {
        const {refreshToken} = this.props;
        if (refreshToken) {
            this.props.openTasksListScreen();
        } else {
            this.props.openLoginListScreen();
        }
    }

    render() {
        return (
            <View>
                <Text>Launch screen</Text>
                <Text>Your advert may be here</Text>
            </View>
        );
    }
}

const mapStateToProp = state => ({
    refreshToken: state.auth.refreshToken
});

const mapDispatchToProps = dispatch => ({
    openTasksListScreen: () => dispatch(reset({key: screens.TASKS_LIST_SCREEN, timestamp: (new Date).getTime()})),
    openLoginListScreen: () => dispatch(reset({key: screens.LOGIN_SCREEN}))
});

export default connect(mapStateToProp, mapDispatchToProps)(LaunchScreen);
