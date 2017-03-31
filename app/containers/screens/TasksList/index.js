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
import {uploadTasks} from '../../../actions/tasks';
import {isTheSameDay} from '../../../util';

import * as screens from '../../../constatns/screens';

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
                    style={{ backgroundColor: '#5067FF'}}
                    containerStyle={styles.fab}
                    position="bottomRight"
                    active={false}
                    onPress={() => this.props.navigateToCreateTaskScreen()}
                >
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
    showCalendarPicker: props => dispatch(showModal(SHOW_CALENDAR_PICKER, props))
});


const StyledTasksList = connectStyle('mainTheme.TasksList', styles)(TasksList);

export default connect(mapStateToProps, mapDispatchToProps)(StyledTasksList);

