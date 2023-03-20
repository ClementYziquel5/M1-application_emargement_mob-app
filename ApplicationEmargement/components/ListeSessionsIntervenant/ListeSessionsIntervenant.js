import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import TouchableSession from "../TouchableSession/TouchableSession";

/*
 * Liste des sessions de l'intervenant
 * 
 * props:
 * - sessions: liste des sessions de l'intervenant
 * - setSessionId: fonction pour modifier l'id de la session en cours
 * - setSession: fonction pour modifier la session en cours
 * - setEmargementEnCours: fonction pour modifier l'état de l'émargement en cours
 * - emargementEnCours: état de l'émargement en cours
 */
export default function ListeSessionsIntervenant(props) {
    return (
        <ScrollView contentContainerStyle={styles.ScrollView}>            
            {props.sessions.map((session) => (
                <TouchableSession key={session.id} session={session}/>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    ScrollView: {
        alignItems: "center",
    },
});