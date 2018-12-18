import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default H4 = (props) => {
    return <Text style={style.h4} {...props}>{props.children}</Text>;
}

const style = StyleSheet.create({
    h4: {
        fontSize: 15,
        fontWeight: "bold"
    }
});