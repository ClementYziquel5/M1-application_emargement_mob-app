import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import BoutonScanner from "../BoutonScanner/BoutonScanner";

export default function EmargementEleve(props) {

    return (
        <View style={styles.emargementEleve} >
            <Text style={styles.text}>Émargement</Text>
            <View style={styles.button} >
                <BoutonScanner />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    emargementEleve: {
        flex: 1,
        flexDirection: "column",
    },
    text: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontFamily:'Cabin-Bold'
    },
});