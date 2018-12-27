import * as React from 'react'
import { Text, StyleSheet } from 'react-native';

class H3 extends React.Component<any, any> {
    render() {
        return <Text style={[styles.h3, this.props.style]}>{this.props.children}</Text>; 
    }
}

const styles = StyleSheet.create({
    h3: {
        fontSize: 18,
        fontWeight: "bold"
    }
});

export default H3;