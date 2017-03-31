'use strict';

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {View, Dimensions, StyleSheet, Text, Button, TouchableHighlight} from 'react-native';

const {height, width} = Dimensions.get('window');

import * as modalConstants from '../../../constatns/modal';
import {hideModal} from '../../../actions/modal';

import CalendarDialog from '../../../components/modals/CalendarDialog';


const mapModals = {
    [modalConstants.SHOW_CALENDAR_PICKER]: CalendarDialog
};

class ModalRoot extends PureComponent {
    constructor(props) {
        super(props);
    }

    onEmptyFieldClick = () => this.props.hideModal();

    render() {

        const {modalType, modalProps} = this.props;

        if (!this.props.modalType) {
            return null;
        }

        let TargetModal = mapModals[modalType];

        return (<View style={styles.container}>
            <TouchableHighlight style={styles.touchable}
                                onPress={this.onEmptyFieldClick}>
                <View>
                    <TargetModal {...modalProps}/>
                </View>
            </TouchableHighlight>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1234567F',
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: width,
        height: height,
    },
    touchable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = state => ({
    modalType: state.modal.modalType,
    modalProps: state.modal.modalProps
});

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);