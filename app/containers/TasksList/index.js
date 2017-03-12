'use strict';

import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';
import {Container, Header, Title, Button, Text, Left, Right, Body, Icon, Content, List, ListItem} from 'native-base';
import {connect} from 'react-redux';
import {connectStyle} from 'native-base';


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

const styles = {
    container: {
        flex: 1
    }
};

const StyledTasksList = connectStyle('mainTheme.TasksList', styles)(TasksList);

export default connect(mapStateToProps, mapDispatchToProps)(StyledTasksList);

