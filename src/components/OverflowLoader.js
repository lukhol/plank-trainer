import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Spinner } from 'native-base';
import Colors from '../common/colors';

export default OveflowLoader = (props) => {
    return (
        <View 
            style={{
                elevation:2, 
                zIndex: 900, 
                flex:1, 
                width: "100%", 
                height: "100%", 
                position: 'absolute',
                alignItems: "center", 
                justifyContent: "center",
                backgroundColor:"#00000077",
                ...props.style
            }}
        >
            <Spinner color={Colors.PRIMARY} />
        </View>
    )
}