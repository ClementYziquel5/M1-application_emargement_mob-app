import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

export default function ListeEleves(props) {

    return (
        <ScrollView contentContainerStyle={styles.ScrollView}>
            {props.listeEleves.map((eleve) => (
                <View style={styles.eleve} key={eleve.ine}>
                    <Text style={styles.nom}>{eleve.nom} {eleve.prenom}</Text>
                    {eleve.presence ?
                        <Image source={require('./OK.png')} style={styles.check} />
                    :
                        <Image source={require('./KO.png')} style={styles.check} />
                    }
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