'use strict';

import React, {Component, PropTypes} from 'react';
import {View, RefreshControl} from 'react-native';
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
    List,
    ListItem,
    Spinner,
    Fab
} from 'native-base';
import {connect} from 'react-redux';
import {connectStyle} from 'native-base';

import _ from 'lodash';


import {push} from '../../actions/router';
import {uploadTasks} from '../../actions/tasks';
import {dateToDayid, isTheSameDay} from '../../util';

import * as screens from '../../constatns/screens';

class TasksList extends Component {

    componentDidMount() {
        if (_.keys(this.props.tasks).length === 0) {
            this.props.updateTasks();
        }
    }

    renderTasksList = () => <List dataArray={this.props.tasks} renderRow={this.renderTaskItem}/>;

    renderTaskItem = task => {
        const backgroundStyle = {
            backgroundColor: task.content.color + '4F',
            width: 10000,
            height: 10000,
            position: 'absolute',
            left: 0,
            top: 0,
        };

        const internalBackground = {
            ...backgroundStyle,
            backgroundColor: task.content.color,
            width: 10,
        };

        return <ListItem onPress={this.props.navigateToTaskDetailsScreen(task._id)} thumbnail>
            <View style={styles.container}>
                <View style={backgroundStyle}>
                    <View style={internalBackground}/>
                </View>
                <Body>
                <Text>{task.content.title}</Text>
                <Text note>{task.content.description}</Text>
                </Body>
            </View>
        </ListItem>;
    };

    refreshControl = () => <RefreshControl
        refreshing={this.props.downloading}
        onRefresh={this.refresh}
    />;

    refresh = () => this.props.updateTasks();

    render() {
        const {date} = this.props;

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content refreshControl={this.refreshControl()}>
                    {this.props.downloading ? (<Spinner color='blue'/>) : null}
                    {this.renderTasksList()}
                </Content>
                <Fab
                    active
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.props.navigateToCreateTaskScreen()}
                >
                    <Icon name="add"/>
                </Fab>
            </Container>
        );
    }
}

TasksList.propTypes = {
    date: PropTypes.any.isRequired
};

const mapStateToProps = (state, ownProps) => {
    let date = new Date(_.last(state.router.routes).timestamp);
    return {
        tasks: findTasksByDate(state.tasks, date),
        downloading: state.router.downloading,
        date: date
    }
};

function findTasksByDate(tasks, date) {
    return _.values(tasks).filter(task => isTheSameDay(new Date(task.date.start), date));
}


const mapDispatchToProps = (dispatch, ownProps) => ({
    updateTasks: () => dispatch(uploadTasks()),
    navigateToCreateTaskScreen: () => dispatch(push({key: screens.CREATE_TASK_SCREEN})),
    navigateToTaskDetailsScreen: taskId => () => dispatch(push({key: screens.TASK_DETAILS_SCREEN, taskId: taskId}))
});

const styles = {
    container: {
        flex: 1
    }
};

const StyledTasksList = connectStyle('mainTheme.TasksList', styles)(TasksList);

export default connect(mapStateToProps, mapDispatchToProps)(StyledTasksList);

