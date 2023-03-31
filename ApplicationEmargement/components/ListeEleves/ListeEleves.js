import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

/*
 * Liste des étudiants participant à la session
 *
 * props:
 * - listeEtudiants: liste des étudiants
 */
export default function ListeEtudiants(props) {

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
        width: "85%",
        height: 40,
        backgroundColor: "rgba(70, 70, 70, 1)",
        borderRadius: 15,
        marginVertical: 7,
        padding: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    nom: {
        fontSize: 15,
        color: "white",
        fontFamily: "Cabin-Regular",
    },
    check: {
        width: 17,
        height: 17,
    },
});