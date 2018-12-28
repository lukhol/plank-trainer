import { StyleSheet } from "react-native";
import { Padding } from './constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF00"
    },
    borderContainer: {
        borderColor: 'red',
        borderWidth: 1
    },
    textButton: {
        color: "#fff"
    },
    title:{
        fontSize: 24,
        padding: 16,
        fontWeight: "bold"
    },
    startContainer: {
        padding: Padding.SM,
        alignItems: "center",
        justifyContent: "center"
    },
    centerContainer: {
        flex: 1,
        padding: Padding.SM,
        justifyContent: "center"
    },
    endContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    trashTouchable: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 35,
        width: 35, 
        alignItems:"center",
        justifyContent: "center"
    }
});