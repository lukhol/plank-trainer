import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Picker  } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { IconSize } from '../common/constants';
import globalStyles from '../common/styles';

export interface SettingsPickerProps {
    text: string,
    selectedValue: string,
    onValueChange: any,
    data: Array<Item>,
    iconName: string
}

export interface Item {
    label: string,
    value: string
};

class SettingsPicker extends Component<SettingsPickerProps> {
    render() {
        return (
            <View style={{flexDirection: "row"}}>
                <View style={globalStyles.startContainer}>
                    <Icon name={this.props.iconName} size={IconSize.MD} color="#000" />
                </View>
                <View style={globalStyles.centerContainer}>
                    <Text>
                        {this.props.text}
                    </Text>
                </View>
                <View style={{...globalStyles.endContainer, minWidth: 120}}>
                    <Picker 
                        mode="dropdown"
                        style={{width: 120}}
                        selectedValue={this.props.selectedValue}
                        onValueChange={this.props.onValueChange}
                    >
                        {this.props.data.map((item: any, index) => <Picker.Item label={item.label} value={item.value} key={index} /> )}
                    </Picker>
                </View>
            </View>
        )
    }
}

export default SettingsPicker;