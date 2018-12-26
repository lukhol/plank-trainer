import * as React from 'react'
import { Text, StyleSheet } from 'react-native';

const H3: React.SFC = (props: any) => {
    return <Text style={styles.h3} {...props}>{props.children}</Text>;
}

const styles = StyleSheet.create({
    h3: {
        fontSize: 18,
        fontWeight: "bold"
    }
});

export default H3;