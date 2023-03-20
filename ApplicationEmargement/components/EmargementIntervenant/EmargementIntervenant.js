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
    const [scanEnCours, setScanEnCours] = useState(false);
    const [listeEleves, setListeEleves] = useState([]);

    // Gérer tout l'émargement ici
    function emargement() {
        setScanEnCours(!scanEnCours);
    }

    useEffect(() => {
        fetchEtudiants(props.sessionId);
    }, []);

    async function fetchEtudiants(idSession) {
        let url = "http://192.168.1.56:8000/api/v1.0/session/" + idSession + "/etudiants";
    
        return fetch(url)
        .then((response) => response.json())
        .then((json) => {
            setListeEleves(json);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return props.session ? (
        <View style={styles.emargementIntervenant} >
            <View>
                <ListeSessionsIntervenant sessions={props.session} emargementEnCours={props.emargementEnCours}/>
            </View>
            <View style={styles.button} >
                <BoutonEmargement emargement={emargement} setScanEnCours={setScanEnCours} scanEnCours={scanEnCours}/>
            </View>
            <ScrollView>
                <ListeEleves listeEleves={listeEleves}/>
            </ScrollView>
        </View>)
        :(
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