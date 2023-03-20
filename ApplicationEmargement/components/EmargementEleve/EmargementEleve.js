import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import BoutonScanner from "../BoutonScanner/BoutonScanner";
import ListeSessionsEleve from "../ListeSessionsEleve/ListeSessionsEleve";

/*
 * Emargement de l'élève
 *
 * props:
 * - sessionId: id de la session en cours
 * - session: session en cours
 */
export default function EmargementEleve(props) {
    return (
        <View style={styles.emargementEleve} >
            <View>
                <ListeSessionsEleve sessions={props.session} setSessionId={props.setSessionId} setSession={props.setSession} setEmargementEnCours={props.setEmargementEnCours}/>
            </View>
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
        marginTop: '35%',
    },
    text: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontFamily:'Cabin-Bold'
    },
});