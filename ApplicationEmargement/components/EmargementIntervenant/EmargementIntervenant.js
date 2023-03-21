import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator } from "react-native";
import BoutonEmargement from "../BoutonEmargement/BoutonEmargement";
import ListeSessionsIntervenant from "../ListeSessionsIntervenant/ListeSessionsIntervenant";
import ListeEleves from "../ListeEleves/ListeEleves";


/*
 * Emargement de l'intervenant
 * 
 * props:
 * - sessionId: id de la session en cours
 * - session: session en cours
 */
export default function EmargementIntervenant(props) {
    const { navigation } = props;
    props = props.route.params;

    const [demarrerEmargement, setDemarrerEmargement] = useState(false);
    // Gérer tout l'émargement ici
    function emargement() {
        setScanEnCours(!scanEnCours);
    }

    return props.session ? (
        <View style={styles.emargementIntervenant} >
            <View>
            <ListeSessionsIntervenant sessions={[props.session]}/>
            </View>
            <View style={styles.button} >
                <BoutonEmargement emargement={emargement} setScanEnCours={setScanEnCours} scanEnCours={scanEnCours}/>
            </View>
            <ScrollView>
                <ListeEleves listeEleves={listeEleves}/>
            </ScrollView>
        </View>
        ) : (
        <View>
            <Text style={styles.text}>Chargement...</Text>
            <ActivityIndicator size="large" color="#E20612" style={styles.spinner} />
        </View>
    );
}

const styles = StyleSheet.create({
    emargementIntervenant: {
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