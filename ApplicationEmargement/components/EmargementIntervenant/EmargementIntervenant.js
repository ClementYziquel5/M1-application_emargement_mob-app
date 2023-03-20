import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
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
    const [demarrerEmargement, setDemarrerEmargement] = useState(false);

    // Gérer tout l'émargement ici
    function emargement() {
        setDemarrerEmargement(!demarrerEmargement);
    }

    useEffect(() => {
        console.log("session id: " + props.sessionId);
        console.log("session: " + props.session);
    }, []);

    return (
        <View style={styles.emargementProf} >
            <View>
                <ListeSessionsIntervenant sessions={props.session}/>
            </View>
            <View style={styles.button} >
                <BoutonEmargement emargement={emargement} setDemarrerEmargement={setDemarrerEmargement} />
            </View>
            <ScrollView>
                <ListeEleves nombre="30"/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    emargementProf: {
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