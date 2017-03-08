'use strict';

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

class TasksList extends Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>TASKS</Text>
                <Text>TASKS</Text>
                <Text>TASKS</Text>
                <Text>TASKS</Text>
                <Text>TASKS</Text>
            </View>
        );
    }
}

export default connect()(TasksList);



