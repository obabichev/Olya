'use strict';

import React, {Component} from 'react';
import {Drawer} from 'native-base';
import {connect} from 'react-redux';

import SideBar from '../../components/menu/SideBar';
import {closeNavBar} from '../../actions/router';

class NavigationDrawer extends Component {

    onClose = () => {
        this.props.closeNavBar();
    };

    render() {
        return (
            <Drawer
                open={this.props.openNavBar}
                acceptPan={true}
                onClose={this.onClose}
                children={this.props.children}
                content={<SideBar/>}
            />
        );
    }
}

NavigationDrawer.propTypes = {
    children: React.PropTypes.any
};

const mapStateToProps = state => ({
    openNavBar: state.router.openNavBar
});

const mapDispatchToProps = dispatch => ({
    closeNavBar: () => dispatch(closeNavBar())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer);