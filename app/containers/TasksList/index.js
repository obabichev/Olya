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


import {openCreateTaskScreen} from '../../actions/router';
import {uploadTasks} from '../../actions/tasks';
import {dateToDayid} from '../../util';

class TasksList extends Component {

    componentDidMount() {
        this.props.updateTasks();
    }

    renderTasksList = () => <List dataArray={this.props.tasks} renderRow={this.renderTaskItem}/>;

    renderTaskItem = task => {
        const backgroundStyle = {
            backgroundColor: task.content.color + '7F',
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

        return <ListItem thumbnail>
            <View style={styles.container}>
                <View style={backgroundStyle}>
                    <View style={internalBackground}/>
                </View>
                <Body>
                <Text>{task.content.title}</Text>
                <Text note>{task.content.text}</Text>
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
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Tasks list</Title>
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

const mapStateToProps = (state, ownProps) => ({
    tasks: state.tasks.tasks[dateToDayid(ownProps.date)],
    downloading: state.router.downloading,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateTasks: () => dispatch(uploadTasks()),
    navigateToCreateTaskScreen: () => dispatch(openCreateTaskScreen())
});

const styles = {
    container: {
        flex: 1
    }
};

const StyledTasksList = connectStyle('mainTheme.TasksList', styles)(TasksList);

export default connect(mapStateToProps, mapDispatchToProps)(StyledTasksList);

