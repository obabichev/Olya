'use strict';

import React, {PureComponent} from 'react'

import {connect} from 'react-redux'

import {View, TextInput, Button} from 'react-native';

import {tryFetchRefreshToken} from '../../../actions/auth';

class LoginScreen extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
    }

    render() {
        const {login, password} = this.state;
        return <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <View style={{width: '70%'}}>
                <TextInput value={login}
                           onChangeText={text => this.setState({login: text})}/>
                <TextInput value={password}
                           onChangeText={text => this.setState({password: text})}
                           secureTextEntry/>
                <Button title='Login'
                        onPress={() => this.props.onAuth({login, password})}/>
            </View>
        </View>;
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onAuth: credentionals => dispatch(tryFetchRefreshToken(credentionals))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);