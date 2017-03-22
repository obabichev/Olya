'use strict';

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

import {reset} from '../../actions/router';
import * as screens from '../../constatns/screens';

class LaunchScreen extends Component {

    componentDidMount() {
        if (true) {
            this.props.openTasksListScreen();
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

const mapDispatchToProps = dispatch => ({
    openTasksListScreen: () => dispatch(reset({key: screens.TASKS_LIST_SCREEN}))
});

export default connect(undefined, mapDispatchToProps)(LaunchScreen);
