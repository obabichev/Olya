'use strict';

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

class LaunchScreen extends Component {
    render() {
        return (
            <View>
                <Text>Launch screen</Text>
                <Text>Your advert may be here</Text>
            </View>
        );
    }
}

export default connect()(LaunchScreen);
