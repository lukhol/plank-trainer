import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default H3 = (props) => {
    return <Text style={style.h3} {...props}>{props.children}</Text>;
}

const style = StyleSheet.create({
    h3: {
        fontSize: 18,
        fontWeight: "bold"
    }
});