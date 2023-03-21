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
    console.log(props.session);

    const [demarrerEmargement, setDemarrerEmargement] = useState(false);

    // Gérer tout l'émargement ici
    function emargement() {
        setDemarrerEmargement(!demarrerEmargement);
    }

    return props.session ? (
        <View style={styles.emargementProf} >
            <View>
                <ListeSessionsIntervenant sessions={[props.session]}/>
            </View>
            <View style={styles.button} >
                <BoutonEmargement emargement={emargement} setDemarrerEmargement={setDemarrerEmargement} />
            </View>
            <ScrollView>
                <ListeEleves nombre="30"/>
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