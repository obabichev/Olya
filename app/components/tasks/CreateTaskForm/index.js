'use strict';

import React, {PureComponent, PropTypes} from 'react';
import {View, Dimensions, TouchableHighlight} from 'react-native';
import {Item, Picker, Text, Form, Label, Input, Content, Button, Spinner, Thumbnail} from 'native-base';
import {fromHsv} from 'react-native-color-picker'

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

    calendarPickerProps = () => ({
        selectedDate: this.state.date,
        onDateChange: this.onDateChange
    });

    colorPickerProps = () => ({
        onColorChange: this.onColorChange,
        defaultColor: this.state.content.color
    });


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

    colorPickerView = () => <TouchableHighlight onPress={() => this.props.showColorPicker(this.colorPickerProps())}>
        <View style={{margin: 5, width:64, height: 64, backgroundColor: this.state.content.color}}/>
    </TouchableHighlight>;

    render() {
        return (<Form>
            <Content style={{margin: 10}}>
                <View style={{flexDirection:'row'}}>
                    {this.colorPickerView()}
                    <View style={{flex: 1}}>
                        <Label>Priority</Label>
                        <Picker mode="dropdown"
                                selectedValue={this.state.content.priority}
                                onValueChange={this.onSelectPriority}>
                            {this.priorityItems()}
                        </Picker>
                    </View>
                </View>
            </Content>
            <Item stackedLabel>
                <Label>Title</Label>
                <Input onChangeText={this.onTitleChange}/>
            </Item>
            <Item stackedLabel>
                <Label>Description</Label>
                <Input onChangeText={this.onDescriptionChange}/>
            </Item>
            <Button onPress={() => this.props.showCalendarPicker(this.calendarPickerProps())}
                    style={{margin: 10}}
                    primary
                    block>
                <Text> {this.state.date.toDateString()} </Text>
            </Button>
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
    showCalendarPicker: PropTypes.func,
    showColorPicker: PropTypes.func,
};

export default CreateTaskForm;