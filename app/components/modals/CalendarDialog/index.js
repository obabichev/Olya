'use strict';

import React, {Component} from 'react';

import {View, Text, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export default class CalendarDialog extends Component {
    render() {
        return (<Text>HIIIII</Text>);
    }
};

const styles = {
    container: {
        backgroundColor: '#1234567F',
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height
    }
};