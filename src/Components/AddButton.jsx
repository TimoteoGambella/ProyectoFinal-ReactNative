import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { colors } from "../Global/Colors";

const AddButton = ({
    title = "",
    onPress = () => {},
    color = colors.color3,
}) => {
    return (
        <Pressable
            style={{ ...styles.button, backgroundColor: color }}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

export default AddButton;

const styles = StyleSheet.create({
    button: {
        width: "80%",
        borderWidth: 1,
        backgroundColor: colors.color3,
        justifyContent: "center",
        alignItems: "center",
        padding: 8
    },
    text: {
        fontFamily: "Ubuntu",
        fontSize: 18,
        color: colors.color4,
    },
});
