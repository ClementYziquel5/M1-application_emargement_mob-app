import React, { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, TouchableOpacity, Text, View, ScrollView, ActivityIndicator } from "react-native";
import {REACT_APP_API_URL} from "@env"
import NfcManager, {Ndef, NfcEvents, NfcTech} from 'react-native-nfc-manager';

import BoutonEmargement from "../BoutonEmargement/BoutonEmargement";
import ListeSessionsIntervenant from "../ListeSessionsIntervenant/ListeSessionsIntervenant";
import ListeEleves from "../ListeEleves/ListeEleves";
import EmargementContext from "../../contexts/EmargementContext";

/*
 * Emargement de l'intervenant
 * 
 * props:
 * - sessionId: id de la session en cours
 * - session: session en cours
 */
export default function EmargementIntervenant(props) {
    const {navigation} = props;
    props = props.route.params;

    const [scanEnCours, setScanEnCours] = useState(false);
    const [listeEleves, setListeEleves] = useState([]);
    const [receivedCodeEmargement, setReceivedCodeEmargement] = useState(null);
    const [loaded, setLoaded] = useState(false);
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

    useEffect(() => {
        listeEleves.map((eleve) => {
            if (eleve.code_emargement === receivedCodeEmargement) {
                console.log('Élève trouvé:', eleve);
                eleve.presence = true;
                // Mettre à jour la liste des élèves
                setListeEleves([...listeEleves]);
            }
        });
    }, [receivedCodeEmargement]);

    useEffect(() => {
        fetchEtudiants(props.sessionId);
    }, []);

    async function fetchEtudiants(idSession) {
        let url = `${REACT_APP_API_URL}` + "/v1.0/session/" + idSession + "/etudiants";
    
        return fetch(url)
        .then((response) => response.json())
        .then((json) => {
            setListeEleves(json);
            setLoaded(true);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        NfcManager.start();
        return () => {
          NfcManager.cancelTechnologyRequest().catch(() => 0);
          NfcManager.stop();
        };
    }, []);

    const ndefHandler = (tag) => {
        if (tag.ndefMessage && tag.ndefMessage.length > 0) {
          const parsedRecords = tag.ndefMessage.map((record) => {
            if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
              return Ndef.text.decodePayload(record.payload);
            }
            return null;
          }).filter((record) => record !== null);
    
          console.log('Parsed records:', parsedRecords);
        } else {
          console.log('No NDEF data found on the tag');
        }
    };

    const readNFC = async () => {
        console.log("Read NFC");
        try {
          await NfcManager.requestTechnology(NfcTech.Ndef);
          const tag = await NfcManager.getTag();
          console.log('Tag info:', tag);
          ndefHandler(tag);
          NfcManager.cancelTechnologyRequest();
        } catch (error) {
          console.warn('Error reading NFC:', error);
        }
    };

    // Gérer tout l'émargement ici
    function emargement() {
        setScanEnCours(!scanEnCours);
        readNFC();
    }

    return loaded ? (
        <View style={styles.emargementIntervenant} >
            <View>
            <ListeSessionsIntervenant sessions={[props.session]}/>
            </View>
            <View style={styles.button} >
                <BoutonEmargement emargement={emargement} scanEnCours={scanEnCours}/>
            </View>
            {receivedCodeEmargement ? (
                <Text style={styles.text}>Code d'émargement reçu: {receivedCodeEmargement}</Text>    
            ) : (
                <Text style={styles.text}>Aucun code d'émargement reçu</Text>
            )}
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


async function startNfc(onDiscoverTag) {
    try {
        await NfcManager.start();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, onDiscoverTag);
    } catch (err) {
        console.warn('Erreur lors du démarrage de l\'écoute NFC', err);
    }
}
  
async function stopNfc() {
    try {
        await NfcManager.stop();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    } catch (err) {
        console.warn('Erreur lors de l\'arrêt de l\'écoute NFC', err);
    }
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
    spinner: {
        marginTop: 20,
    },
});