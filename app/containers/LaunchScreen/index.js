'use strict';

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

import {openTasksListScreen} from '../../actions/router';

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
    openTasksListScreen: () => dispatch(openTasksListScreen())
});

export default connect(undefined, mapDispatchToProps)(LaunchScreen);
