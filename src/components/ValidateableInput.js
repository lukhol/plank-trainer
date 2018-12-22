import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

class ValidatableInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = {
            borderBottomWidth: 1
        };

        if(this.props.isValid) {
            style = {
                borderColor: '#89f450',
                //color: '#89f450'
            };
        } else {
            style = {
                borderColor: 'red',
                //color: 'red'
            }
        }

        return (
            <View>
                <TextInput 
                    value={this.props.value}
                    onChangeText={this.props.onChangeText}
                    placeholder={this.props.placeholder}
                    style={{...this.props.style, ...style}}
                />
                {!this.props.isValid &&
                    <Text style={{color: 'red', marginHorizontal: this.props.style.margin + 4}}>
                        {this.props.errorMessage}
                    </Text>
                }
            </View>
        )
    }
}

ValidatableInput.propTypes = {
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    isValid: PropTypes.bool,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string
};

export default ValidatableInput;