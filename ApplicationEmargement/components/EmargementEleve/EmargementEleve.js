import React, { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import {REACT_APP_API_URL} from "@env"
import BoutonScanner from "../BoutonScanner/BoutonScanner";
import ListeSessionsEleve from "../ListeSessionsEleve/ListeSessionsEleve";
import EmargementContext from "../../contexts/EmargementContext";


/*
 * Emargement de l'élève
 *
 * props:
 * - sessionId: id de la session en cours
 * - session: session en cours
 */
export default function EmargementEleve(props) {
    const {navigation} = props;
    props = props.route.params;

    const [scanEnCours, setScanEnCours] = useState(false);
    const [codeEmargement, setCodeEmargement] = useState(false);
    const { emargementEnCours, setEmargementEnCours } = useContext(EmargementContext);

    const onBackPress = useCallback(() => {
        setEmargementEnCours(false);
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault(); // Empêche la navigation
            onBackPress(); // Exécute la fonction de gestion d'événement
            navigation.dispatch(e.data.action); // Autorise la navigation
        });
        return unsubscribe;
    }, [navigation, onBackPress]);

    // Gérer tout l'émargement ici
    function emargement() {
        setScanEnCours(!scanEnCours);
    }
    
    useEffect(() => {
        fetchCodeEmargement(props.sessionId, props.ine);
    }, []);

    async function fetchCodeEmargement(idSession, ine) {
        let url = `${REACT_APP_API_URL}` + "/v1.0/session/" + idSession + "/etudiant/" + ine + "/code_emargement";
    
        return fetch(url)
        .then((response) => response.json())
        .then((json) => {
            setCodeEmargement(json.code_emargement);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return codeEmargement ? (
        <View style={styles.emargementEleve} >
            <View>
                <ListeSessionsEleve sessions={[props.session]} emargementEnCours={props.emargementEnCours}/>
            </View>
            <Text style={styles.text}>Émargement</Text>
            <View style={styles.button} >
                <BoutonScanner />
            </View>
            <View style={styles.codeEmargement} >
                <Text style={styles.text}>Code d'émargement: {codeEmargement}</Text>
            </View>
        </View>
        ) : (
            <View>
                <Text style={styles.text}>Chargement...</Text>
                <ActivityIndicator size="large" color="#E20612" style={styles.spinner} />
            </View>
    );
}

const styles = StyleSheet.create({
    emargementEleve: {
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
    spinner: {
        marginTop: 20,
    },
    codeEmargement: {
        marginTop: 200,
    },
});