'use strict';

import React, {PureComponent, PropTypes} from 'react';
import {View} from 'react-native';
const taskStatuses = require('../../../classifiers/task_status.json');
import {
    Text,
    Body,
    ListItem,
    Button,
    Icon,
    Right,
} from 'native-base';

class TasksListItem extends PureComponent {
    constructor(props) {
        super(props);
    }

    taskActions = task => task.status === taskStatuses.new
        ? this.newTaskActions()
        : this.completedTaskActions(task);

    newTaskActions = () => <View style={{flexDirection: 'row'}}>
        <Button success iconLeft
                onPress={() => this.props.changeStatus(taskStatuses.done)}>
            <Icon name='md-checkmark'/>
        </Button>
        <Button danger iconLeft
                onPress={() => this.props.changeStatus(taskStatuses.cancelled)}>
            <Icon name='md-close'/>
        </Button>
    </View>;

    completedTaskActions = task => {
        return (<Button success={task.status === taskStatuses.done}
                        danger={task.status === taskStatuses.cancelled}
                        iconLeft
                        onPress={() => this.props.changeStatus(taskStatuses.new)}>
            <Icon name='md-undo'/>
        </Button>);
    };


    render() {
        const {task} = this.props;
        return <ListItem onPress={this.props.onPress} thumbnail>
            <View style={styles(task).backgroundStyle}>
                <View style={styles(task).internalBackground}/>
            </View>
            <Body>
            <View>
                <Text>{task.content.title}</Text>
                <Text note>{task.content.description}</Text>
            </View>
            </Body>
            <Right>
                {this.taskActions(task)}
            </Right>
        </ListItem>;
    }
}

TasksListItem.propTypes = {
    task: PropTypes.any,
    onPress: PropTypes.func,
    changeStatus: PropTypes.func,
};

const styles = task => ({
    container: {
        flex: 1
    },
    backgroundStyle: {
        backgroundColor: task.content.color + '4F',
        width: 10000,
        height: 10000,
        position: 'absolute',
        left: 0,
        top: 0,
    },

    internalBackground: {
        height: 10000,
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: task.content.color,
        width: 10,
    }
});

export default TasksListItem;