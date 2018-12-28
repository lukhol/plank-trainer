import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

export interface ValidatableInputProps {
    value: string,
    onChangeText: any,
    isValid: boolean
    placeholder?: string,
    errorMessage?: string,
    style?: any
};

class ValidatableInput extends Component<ValidatableInputProps, any> {
    constructor(props: ValidatableInputProps) {
        super(props);
    }

    render() {
        let style = {
            borderBottomWidth: 1,
            borderColor: ''
        };

        if(this.props.isValid) {
            style = {
                ...style,
                borderColor: '#89f450',
            };
        } else {
            style = {
                ...style,
                borderColor: 'red',
            }
        }

        const margin = this.props.style ? this.props.style.margin : 0;
        return (
            <View>
                <TextInput 
                    value={this.props.value}
                    onChangeText={this.props.onChangeText}
                    placeholder={this.props.placeholder}
                    style={{...this.props.style, ...style}}
                />
                {!this.props.isValid &&
                    <Text style={{color: 'red', marginHorizontal: margin + 4}}>
                        {this.props.errorMessage}
                    </Text>
                }
            </View>
        )
    }
}

export default ValidatableInput;