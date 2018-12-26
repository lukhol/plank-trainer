import React from 'react';
import { Text, StyleSheet } from 'react-native';

const H5: React.SFC = (props: any) => {
    return <Text style={styles.h5} {...props}>{props.children}</Text>;
}

const styles = StyleSheet.create({
    h5: {
        fontSize: 10
    }
});

export default H5;