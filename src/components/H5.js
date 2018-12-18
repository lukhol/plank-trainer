import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default H5 = (props) => {
    return <Text style={style.h5} {...props}>{props.children}</Text>;
}

const style = StyleSheet.create({
    h5: {
        fontSize: 10
    }
});