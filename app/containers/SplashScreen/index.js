'use strict';

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

class SplashScreen extends Component {
    render() {
        return (
            <View>
                <Text>Your advert may be here</Text>
            </View>
        );
    }
}

export default connect()(SplashScreen);
