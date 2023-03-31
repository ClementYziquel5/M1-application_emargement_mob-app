import React, { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import {REACT_APP_API_URL} from "@env"

import BoutonScanner from "../BoutonScanner/BoutonScanner";
import ListeSessionsEleve from "../ListeSessionsEleve/ListeSessionsEleve";
import EmargementContext from "../../contexts/EmargementContext";
import { HCESession, NFCTagType4NDEFContentType, NFCTagType4 } from 'react-native-hce';

/*
 * Emargement de l'élève
 *
 * props:
 * - navigation: navigation
 * 
 * props.route.params:
 * - sessionId: id de la session en cours
 * - session: session en cours
 * - ine: ine de l'élève
 * - setDefaultPage: fonction pour remettre la page par défaut
 * - emargementEnCours: booléen pour savoir si l'émargement est en cours
 */
export default function EmargementEleve(props) {
    const {navigation} = props;
    props = props.route.params;

    const [scanEnCours, setScanEnCours] = useState(false);
    const [codeEmargement, setCodeEmargement] = useState(false);
    const { emargementEnCours, setEmargementEnCours } = useContext(EmargementContext);
    const [loaded, setLoaded] = useState(false);
    const [session, setSession] = useState(null);


    const onBackPress = useCallback(() => {
        setEmargementEnCours(false);
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault(); // Empêche la navigation
            stopScan();
            onBackPress(); // Exécute la fonction de gestion d'événement
            navigation.dispatch(e.data.action); // Autorise la navigation
        });
        return unsubscribe;
    }, [navigation, onBackPress]);

    // Gérer tout l'émargement ici
    function emargement() {
        if(scanEnCours) { // Si on arrête le scan
            stopScan();
            setScanEnCours(false);
            console.log("Scan arrêté");
        }else { // Si on démarre le scan
            startScan();
            setScanEnCours(true);
            console.log("Scan démarré");
        }
    }

    const startScan = async () => {
        const tag = new NFCTagType4({
            type: NFCTagType4NDEFContentType.Text,
            content: codeEmargement,
            writable: false
        });
      
        const newSession = await HCESession.getInstance();
        newSession.setApplication(tag);
        await newSession.setEnabled(true);
        setSession(newSession); // Update the session state variable
    };
      
    
    const stopScan = async () => {
        if (session) { // Check if session is not null
            try {
                await session.setEnabled(false);
                console.log("Session stopped");
            } catch (error) {
                console.error("Error stopping the session:", error);
            }
        }
    };
    
    useEffect(() => {
        fetchCodeEmargement(props.sessionId, props.ine);
        props.setDefaultPage(false);
    }, []);

    async function fetchCodeEmargement(idSession, ine) {
        let url = `${REACT_APP_API_URL}` + "/v1.0/session/" + idSession + "/etudiant/" + ine + "/code_emargement";
    
        return fetch(url)
        .then((response) => response.json())
        .then((json) => {
            setCodeEmargement(json.code_emargement);
            setLoaded(true);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return loaded ? (
        <View style={styles.emargementEleve} >
            <View>
                <ListeSessionsEleve sessions={[props.session]} emargementEnCours={props.emargementEnCours}/>
            </View>
            <Text style={styles.text}>Émargement</Text>
            <View style={styles.button} >
                <BoutonScanner emargement={emargement} scanEnCours={scanEnCours} />
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