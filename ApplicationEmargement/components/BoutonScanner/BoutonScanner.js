import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
 
export default function BoutonScanner(props){
    return(
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.6}
            >
            <Text style={styles.buttonText}>Scanner</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    button: {
        color: "black",
        backgroundColor: "white",
        borderRadius: 250,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '50%',
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        elevation: 5,
    },
    buttonText: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
    },
});