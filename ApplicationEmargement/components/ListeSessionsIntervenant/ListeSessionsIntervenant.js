import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default function ListeSessionsIntervenant() {
    // Liste de 0 à 10
    const listeSessions = Array.from(Array(10).keys());

    return (
        <ScrollView contentContainerStyle={styles.ScrollView}>            
            {listeSessions.map((session) => (
                <View key={session} style={styles.session}>
                    <View style={styles.gauche}>
                        <Text style={styles.matiere}>Matière {session}</Text>
                        <Text style={styles.type}>Type {session}</Text>
                        <Text style={styles.groupes}>Groupes {session}</Text>
                        <Text style={styles.heure}>Heures {session}</Text>
                    </View>
                    <View style={styles.droite}>
                        <Text style={styles.salles}>Salles {session}</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    ScrollView: {
        alignItems: "center",
    },
    session: {
        width: 300,
        height: 130,
        backgroundColor: "#24284E",
        borderRadius: 15,
        margin: 10,
        padding: 10,
        overflow: "hidden",
        flexDirection: "row",
    },
    matiere: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    type: {
        fontSize: 15,
        color: "grey",
    },
    groupes: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
    },
    heure: {
        fontSize: 15,
        color: "grey",
    },
    salles: {
        fontSize: 15,
        color: "grey",
    },
    gauche: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    droite: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginRight: 10,
    },
});