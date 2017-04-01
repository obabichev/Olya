'use strict';

import React, {PureComponent} from 'react';

import {Container, Header, Left, Button, Icon, Body, Title, Content, Right} from 'native-base';

import {connect} from 'react-redux';

import CreateTaskForm from '../../../components/tasks/CreateTaskForm';

import {pop} from '../../../actions/router';
import {createTask} from '../../../actions/tasks';
import {showModal} from '../../../actions/modal';

import {SHOW_CALENDAR_PICKER, SHOW_COLOR_PICKER} from '../../../constatns/modal';

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
                    downloading={this.props.downloading}
                    showCalendarPicker={this.props.showModal(SHOW_CALENDAR_PICKER)}
                    showColorPicker={this.props.showModal(SHOW_COLOR_PICKER)}/>
            </Content>
        </Container>);
    }
}

const mapStateToProps = state => ({
    downloading: state.router.downloading,
});

const mapDispatchToProps = dispatch => ({
    saveNewTask: task => dispatch(createTask(task)),
    back: () => dispatch(pop()),
    showModal: type => props => dispatch(showModal(type, props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskScreen);
