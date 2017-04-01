'use strict';

import React, {Component, PropTypes} from 'react';
import {View, Text, Dimensions} from 'react-native';

import {ColorPicker} from 'react-native-color-picker'

const {height, width} = Dimensions.get('window');

export default class ColorPickerDialog extends Component {

    render() {
        const {defaultColor, onColorChange} = this.props;
        return (<View style={{backgroundColor: 'white'}}>
                <ColorPicker
                    onColorChange={onColorChange}
                    defaultColor={defaultColor?defaultColor:"#00FF00"}
                    style={{width: width - 10, height: width - 10, margin: 5}}
                />
            </View>
        );
    }
};

ColorPickerDialog.propTypes = {
    onColorChange: PropTypes.func,
    defaultColor: PropTypes.string,
};