import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function BoutonEmargement(props){
    return(
        <TouchableOpacity 
            style={styles.button}
            onPress={() => props.emargement()}
        >
            <Text style={styles.buttonText}>
                {props.emargementEnCours ? "Démarrer la session" : "Terminer la session"}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        color: "black",
        backgroundColor: "white",
        borderRadius: 10,
        marginHorizontal: 30,
        marginVertical: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    buttonText: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
    },
});