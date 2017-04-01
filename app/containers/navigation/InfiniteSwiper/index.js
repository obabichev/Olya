'use strict';

import React, {PureComponent, PropTypes} from 'react'

import {PanResponder, View, Text} from 'react-native';

import {connect} from 'react-redux'

import Swiper from 'react-native-swiper';

class InfiniteSwiper extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            lastIndex: 0,
        }
    }

    isLeft = (index, lastIndex, loopJump) => {
        if (lastIndex === 0 && loopJump) {
            return false;
        }
        if (lastIndex === 1 && loopJump) {
            return true;
        }
        return lastIndex < index;
    };

    onSwipe = (e, state, context) => {
        const {index, loopJump} = state;
        const {lastIndex} = this.state;

        if (this.isLeft(index, lastIndex, loopJump)) {
            this.props.onLeft();
        } else {
            this.props.onRight();
        }

        this.setState({
            lastIndex: index
        });
    };

    render() {

        return <Swiper onMomentumScrollEnd={this.onSwipe}
                       showsPagination={false}>
            {this.props.children}
            {this.props.children}
        </Swiper>;
    }
}

InfiniteSwiper.propTypes = {
    onLeft: PropTypes.func.isRequired,
    onRight: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(InfiniteSwiper);