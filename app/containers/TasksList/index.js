'use strict';

import React, {Component, PropTypes} from 'react';
// import {} from 'react-native';
import {Container, Header, Title, Button, Text, Left, Right, Body, Icon, Content, List, ListItem} from 'native-base';
import {connect} from 'react-redux';

import {uploadTasks} from '../../actions/tasks';
import {dateToDayid} from '../../util';

class TasksList extends Component {

    componentDidMount() {
        this.props.updateTasks();
    }

    renderTasksList = () => <List dataArray={this.props.tasks} renderRow={this.renderTaskItem}/>;

    renderTaskItem = task => <ListItem>
        <Text>HI</Text>
    </ListItem>;

    render() {
        console.log(this.props.date);
        if (this.props.tasks) {
            console.log(`Number of tasks: ${this.props.tasks.length}`);
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

TasksList.propTypes = {
    date: PropTypes.any.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    tasks: state.tasks.tasks[dateToDayid(ownProps.date)]
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateTasks: () => dispatch(uploadTasks())
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);



