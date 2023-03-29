import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function BoutonEmargement(props){
    return props.scanEnCours ? (
        <TouchableOpacity 
            style={styles.button}
            onPressOut={() => {
                props.stopContinuousScan()
            }}>
            <Text style={styles.buttonText}>
                TERMINER LA SESSION
            </Text>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity 
            style={styles.button}
            onPressOut={() => {
                props.startContinuousScan()
            }}>
            <Text style={styles.buttonText}>
                DEMARER LA SESSION
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        color: "black",
        backgroundColor: "white",
        borderRadius: 10,
        width: "85%",
        alignSelf: "center",
        marginVertical: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    buttonText: {
        color: "black",
        fontSize: 17,
        fontFamily: "Roboto-Black",
    },
});