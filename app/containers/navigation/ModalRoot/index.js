'use strict';

import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {View, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

import * as modalConstants from '../../../constatns/modal';

import CalendarDialog from '../../../components/modals/CalendarDialog';

const mapModals = {
    [modalConstants.SHOW_CALENDAR_PICKER]: CalendarDialog
};

class ModalRoot extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {modalType, modalProps} = this.props;

        if (!this.props.modalType) {
            return null;
        }

        let TargetModal = modalConstants[this.props.modalType];

        return (<View style={styles.container}>

        </View>);
    }
}

const styles = {
    container: {
        backgroundColor: '#1234567F',
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: width,
        height: height
    }
};

const mapStateToProps = state => ({
    modalType: state.modal.modalType,
    modalProps: state.modal.modalProps
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);