'use strict';

import React, {Component} from 'react';
import {View, StyleSheet, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {Button, Text, StyleProvider} from 'native-base';

import color from '../../core/settings/color';
// import ProfileHeaderView from '../profile/ProfileHeaderView';

import {closeNavBar} from '../../actions/router';

class SideBar extends Component {

    delimeter = () => <View style={styles.delimeter}/>;

    render() {
        return (
            <View style={styles.container}>
                {this.delimeter()}
                <Button block
                        onPress={this.props.openAnimeListScreen}
                        color={color.PRIMARY_COLOR_DARK}>
                    <Text>Anime list</Text>
                </Button>
                {this.delimeter()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.PRIMARY_COLOR_DARK
    },
    delimeter: {
        height: 1,
        backgroundColor: 'white'
    }
});

const mapDispatchToProps = dispatch => ({
    closeNavBar: () => dispatch(closeNavBar()),
    openAnimeListScreen: () => {
        // dispatch(closeNavBar());
        // dispatch(openAnimeListScreen())
    },
    openProfileScreen: () => {
        // dispatch(closeNavBar());
        // dispatch(openProfileScreen());
    }
});

export default connect(undefined, mapDispatchToProps)(SideBar);
