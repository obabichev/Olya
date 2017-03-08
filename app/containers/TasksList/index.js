'use strict';

import React, {Component} from 'react';
import {Container, Header, Title, Button, Text, Left, Right, Body, Icon, Content, List, ListItem} from 'native-base';
import {connect} from 'react-redux';

import {uploadTasks} from '../../actions/tasks';

class TasksList extends Component {

    componentDidMount() {
        this.props.updateTasks();
    }

    renderTasksList = () => <List dataArray={this.props.tasks} renderRow={this.renderTaskItem}/>;

    renderTaskItem = task => <ListItem>
        <Text>HI</Text>
    </ListItem>;

    render() {
        console.log(`Number of tasks: ${this.props.tasks.length}`);
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Header</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    {this.renderTasksList()}
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    tasks: state.tasks.tasks
});

const mapDispatchToProps = dispatch => ({
    updateTasks: () => dispatch(uploadTasks())
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);



