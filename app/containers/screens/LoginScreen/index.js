'use strict';

import React, {PureComponent} from 'react'

import {connect} from 'react-redux'

import {View} from 'react-native';

class LoginScreen extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <View style={{flex: 1, backgroundColor: 'red'}}/>;
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);