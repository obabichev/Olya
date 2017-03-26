'use strict';

import React, {PureComponent, PropTypes} from 'react'

import {connect} from 'react-redux'

import {
    Container,
    Header,
    Title,
    Button,
    Text,
    Left,
    Right,
    Body,
    Icon,
    Content,
} from 'native-base';

import _ from 'lodash';

class TaskDetailsScreen extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.task){
            return null;
        }
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Tasks details</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Text>{this.props.task.content.title}</Text>
                </Content>
            </Container>
        );
    }
}

TaskDetailsScreen.propTypes = {
    taskId: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
    task: state.tasks[state.router.scene.taskId]
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetailsScreen);