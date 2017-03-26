'use strict';

import React, {PureComponent} from 'react';

import {Container, Header, Left, Button, Icon, Body, Title, Content, Right} from 'native-base';

import {connect} from 'react-redux';

import CreateTaskForm from '../../../components/tasks/CreateTaskForm';

import {pop} from '../../../actions/router';
import {createTask} from '../../../actions/tasks';

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
                <CreateTaskForm
                    onSubmit={this.onSaveTask}
                    downloading={this.props.downloading}/>
            </Content>
        </Container>);
    }
}

const mapStateToProps = state => ({
    downloading: state.router.downloading,
});

const mapDispatchToProps = dispatch => ({
    saveNewTask: task => dispatch(createTask(task)),
    back: () => dispatch(pop())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskScreen);
