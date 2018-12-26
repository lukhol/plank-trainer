import React from 'react';
import { Text, StyleSheet } from 'react-native';

const  H4: React.SFC = (props: any) => {
    return <Text style={styles.h4} {...props}>{props.children}</Text>;
}

const styles = StyleSheet.create({
    h4: {
        fontSize: 15,
        fontWeight: "bold"
    }
});

export default H4;