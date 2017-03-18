'use strict';

import React, {PureComponent} from 'react';

import {Container, Header, Left, Button, Icon, Body, Title, Content, Right} from 'native-base';

import {connect} from 'react-redux';

import CreateTaskForm from '../../components/tasks/CreateTaskForm';

import {openTasksListScreen} from '../../actions/router';
import {createTask} from '../../actions/tasks';

class CreateTaskScreen extends PureComponent {

    onSaveTask = task => this.props.saveNewTask(task);

    render() {
        return (<Container>
            <Header>
                <Left>
                    <Button transparent onPress={this.props.back}>
                        <Icon name='arrow-back'/>
                    </Button>
                </Left>
                <Body>
                <Title>Create task</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                <CreateTaskForm onSubmit={this.onSaveTask}/>
            </Content>
        </Container>);
    }
}

const mapDispatchToProps = dispatch => ({
    saveNewTask: task => dispatch(createTask(task)),
    back: () => dispatch(openTasksListScreen())
});

export default connect(undefined, mapDispatchToProps)(CreateTaskScreen);
