'use strict';

import React, {Component, PropTypes} from 'react';
import {View, RefreshControl} from 'react-native';
import {
    Container,
    Header,
    Title,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Content,
    List,
    Spinner,
    Fab,
    Footer,
    FooterTab
} from 'native-base';
import {connect} from 'react-redux';
import {connectStyle} from 'native-base';

import _ from 'lodash';

import {SHOW_CALENDAR_PICKER} from '../../../constatns/modal';
import {showModal} from '../../../actions/modal';

import {push, replaceLast} from '../../../actions/router';
import {uploadTasks, changeTaskStatus} from '../../../actions/tasks';
import {isTheSameDay} from '../../../util';

import * as screens from '../../../constatns/screens';

import InfiniteSwiper from '../../navigation/InfiniteSwiper';
import TasksListItem from '../../../components/tasks/TasksListItem';

class TasksList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showCalendarDialog: false
        };
    }

    componentDidMount() {
        if (_.keys(this.props.tasks).length === 0) {
            this.props.updateTasks();
        }
    }

    renderTasksList = () => <List dataArray={this.props.tasks} renderRow={this.renderTaskItem}/>;

    renderTaskItem = task => {
        return <TasksListItem task={task}
                              onPress={this.props.navigateToTaskDetailsScreen(task._id)}
                              changeStatus={status => this.props.changeTaskStatus(task, status)}/>;
    };

    refreshControl = () => <RefreshControl
        refreshing={this.props.downloading}
        onRefresh={this.refresh}
    />;

    refresh = () => this.props.updateTasks();

    moveToPreviousDay = () => {
        let date = new Date(this.props.date);
        date.setDate(date.getDate() - 1);
        this.props.moveToDate(date.getTime());
    };

    moveToNextDay = () => {
        let date = new Date(this.props.date);
        date.setDate(date.getDate() + 1);
        this.props.moveToDate(date.getTime());
    };

    moveToToday = () => {
        this.props.moveToDate((new Date()).getTime());
    };

    showCalendarDialog = () => {
        this.props.showCalendarPicker(this.calendarPickerProps());
    };

    calendarPickerProps = () => ({
        selectedDate: this.props.date,
        onDateChange: date => this.props.moveToDate(date),
    });

    title = date => `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    // title = date => date.toDateString();

    screenContent = () => <View>
        {this.props.downloading ? (<Spinner color='blue'/>) : null}
        {this.renderTasksList()}
    </View>;

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
                    <Title>{this.title(date)}</Title>
                    </Body>
                    <Right />
                </Header>

                <Content refreshControl={this.refreshControl()}>
                    <InfiniteSwiper onRight={this.moveToPreviousDay} onLeft={this.moveToNextDay}>
                        {this.screenContent()}
                    </InfiniteSwiper>
                </Content>

                <Fab
                    style={{ backgroundColor: '#5067FF'}}
                    containerStyle={styles.fab}
                    position="bottomRight"
                    active={false}
                    onPress={() => this.props.navigateToCreateTaskScreen()}>
                    <Icon name="add"/>
                </Fab>

                <Footer >
                    <FooterTab>
                        <Button onPress={this.moveToPreviousDay}>
                            <Icon name="md-arrow-back"/>
                        </Button>
                        <Button onPress={this.showCalendarDialog}>
                            <Icon name="calendar"/>
                        </Button>
                        <Button onPress={this.moveToToday} active>
                            <Icon active name="home"/>
                        </Button>
                        <Button onPress={this.moveToNextDay}>
                            <Icon name="md-arrow-forward"/>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = {
    container: {
        flex: 1
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 64
    }

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
    navigateToTaskDetailsScreen: taskId => () => dispatch(push({key: screens.TASK_DETAILS_SCREEN, taskId: taskId})),
    moveToDate: timestamp => dispatch(replaceLast({key: screens.TASKS_LIST_SCREEN, timestamp: timestamp})),
    showCalendarPicker: props => dispatch(showModal(SHOW_CALENDAR_PICKER, props)),
    changeTaskStatus: (task, status) => dispatch(changeTaskStatus(task, status))
});


const StyledTasksList = connectStyle('mainTheme.TasksList', styles)(TasksList);

export default connect(mapStateToProps, mapDispatchToProps)(StyledTasksList);

