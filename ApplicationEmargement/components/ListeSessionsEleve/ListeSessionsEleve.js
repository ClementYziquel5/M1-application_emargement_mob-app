import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, ScrollView } from "react-native";

export default function ListeSessionsEleve(props) {
    return (
        <ScrollView contentContainerStyle={styles.ScrollView}>            
            {props.sessions.map((session) => (
                <TouchableOpacity
                    key={session.id}
                    style={styles.session}
                    onPress={() => console.log('Appuie sur session ' + session.id)}
                >
                    <View style={styles.gauche}>
                        <Text style={styles.matiere}>{session.matiere}</Text>
                        <Text style={styles.type}>{session.type}</Text>
                        <Text style={styles.groupes}>
                            {session.intervenants.map((intervenant) => (
                                intervenant + "  "
                            ))}
                        </Text>
                        <Text style={styles.heure}>{session.heureDebut} - {session.heureFin}</Text>
                    </View>
                    <View style={styles.droite}>
                        <Text style={styles.salles}>
                            {session.salles.map((salle) => (
                                salle + "  "
                            ))}
                        </Text>
                    </View>
                </TouchableOpacity>
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