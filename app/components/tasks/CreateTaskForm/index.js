'use strict';

import React, {PureComponent, PropTypes} from 'react';
import {View, Dimensions} from 'react-native';
import {Item, Picker, Text, Form, Label, Input, Content, Button, Spinner} from 'native-base';
import {ColorPicker} from 'react-native-color-picker'
import {fromHsv} from 'react-native-color-picker'
import CalendarPicker from 'react-native-calendar-picker';

import _ from 'lodash';

const dimensions = Dimensions.get('window');

const priorityClassifier = require('../../../classifiers/priority.json');

const defaultContent = {
    priority: 500,
    title: "",
    description: "",
    color: "#00FF00",
    comment: ""
};

class CreateTaskForm extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            content: defaultContent
        };
    }

    priorityItems = () => _.keys(priorityClassifier).map(
        code => <Item key={code} label={priorityClassifier[code].label} value={Number(code)}/>
    );

    onSelectPriority = code => this.setState({content: {...this.state.content, priority: code}});

    onTitleChange = value => this.setState({content: {...this.state.content, title: value}});

    onDescriptionChange = value => this.setState({content: {...this.state.content, description: value}});

    onColorChange = hsv => this.setState({content: {...this.state.content, color: fromHsv(hsv)}});

    onDateChange = date => this.setState({date: date});// console.log(date.getTime());

    onSubmit = () => {
        if (this.props.onSubmit) {
            this.props.onSubmit({
                status: 'new',
                date: {
                    start: this.state.date.getTime()
                },
                content: this.state.content
            });
        }
    };

    render() {
        return (<Form>
            <Content style={{margin: 10}}>
                <Label>Priority</Label>
                <Picker mode="dropdown"
                        selectedValue={this.state.content.priority}
                        onValueChange={this.onSelectPriority}>
                    {this.priorityItems()}
                </Picker>
            </Content>
            <Item stackedLabel>
                <Label>Title</Label>
                <Input onChangeText={this.onTitleChange}/>
            </Item>
            <Item stackedLabel>
                <Label>Description</Label>
                <Input onChangeText={this.onDescriptionChange}/>
            </Item>

            <CalendarPicker selectedDate={this.state.date}
                            screenWidth={dimensions.width - 10}
                            onDateChange={this.onDateChange}/>

            <ColorPicker
                onColorSelected={color => console.log(`Color selected: ${color}`)}
                onColorChange={this.onColorChange}
                defaultColor={this.state.content.color}
                style={{width: dimensions.width - 10, height: dimensions.width - 10, margin: 5}}
            />
            {this.renderSubmitButton()}
        </Form>);
    }

    renderSubmitButton = () => this.props.downloading ?
        <Spinner color='blue'/> :
        <Button style={{margin: 10}} primary block onPress={this.onSubmit}><Text> Save </Text></Button>;
}

CreateTaskForm.propTypes = {
    onSubmit: PropTypes.func,
    downloading: PropTypes.bool,
};

export default CreateTaskForm;