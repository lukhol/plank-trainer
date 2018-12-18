import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Picker  } from 'native-base';
import PropTypes from 'prop-types';

class SettingsPicker extends Component {
    render() {
        return (
            <View style={{flexDirection: "row"}}>
                <Text style={{flex: 3, alignSelf: "center"}}>
                    {this.props.text}
                </Text>
                <Picker
                    selectedValue={this.props.selectedValue}
                    onValueChange={this.props.onValueChange}
                    style={{flex: 2,alignItems: "center", justifyContent: "center"}}
                >
                    {this.props.data.map((item, index) => <Picker.Item label={item.label} value={item.value} key={index} /> )}
                </Picker>
            </View>
        )
    }
}

SettingsPicker.propTypes = {
    text: PropTypes.string,
    selectedValue: PropTypes.any,
    onValueChange: PropTypes.func,
    data: PropTypes.array
};

export default SettingsPicker;