'use strict';

import React, {Component, PropTypes} from 'react';

import {View, Text, Dimensions} from 'react-native';

import CalendarPicker from 'react-native-calendar-picker'

const {height, width} = Dimensions.get('window');

export default class CalendarDialog extends Component {
    render() {
        const {selectedDate, onDateChange} = this.props;
        return (<View style={{backgroundColor: 'white'}}>
            <CalendarPicker selectedDate={selectedDate?selectedDate:new Date()}
                            screenWidth={width - 10}
                            onDateChange={onDateChange}/>
        </View>);
    }
};

CalendarPicker.propTypes = {
    selectedDate: PropTypes.any,
    onDateChange: PropTypes.func,
};

