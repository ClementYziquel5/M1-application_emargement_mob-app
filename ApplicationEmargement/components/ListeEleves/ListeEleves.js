import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

export default function ListeEleves() {
    // Liste de 0 à 10
    const listeEleves = Array.from(Array(10).keys());

    return (
        <ScrollView contentContainerStyle={styles.ScrollView}>
            {listeEleves.map((eleve) => (
                <View style={styles.eleve} key={eleve}>
                    <Text style={styles.nom}>NOM Prénom {eleve}</Text>
                    <Image source={require('./KO.png')} style={styles.check} />
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    ScrollView: {
        alignItems: "center",
        flexGrow: 1,
    },
    eleve: {
        width: 300,
        height: 50,
        backgroundColor: "#24284E",
        borderRadius: 15,
        margin: 10,
        padding: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    nom: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    check: {
        width: 20,
        height: 20,
    },
});