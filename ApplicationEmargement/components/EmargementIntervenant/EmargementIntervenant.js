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
    //const [receivedCodeEmargement, setReceivedCodeEmargement] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const { emargementEnCours, setEmargementEnCours } = useContext(EmargementContext);
    const [scanInterval, setScanInterval] = useState(null);

    const onBackPress = useCallback(() => {
        setEmargementEnCours(false);
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault(); // Empêche la navigation
            stopContinuousScan();
            onBackPress(); // Exécute la fonction de gestion d'événement
            navigation.dispatch(e.data.action); // Autorise la navigation
        });
        return unsubscribe;
    }, [navigation, onBackPress]);

    function findEleveByCodeEmargement(codeEmargement) {
        listeEleves.map((eleve) => {
            if (eleve.code_emargement === codeEmargement) {
                eleve.presence = true;
                // Mettre à jour la liste des élèves
                setListeEleves([...listeEleves]);
            }
        });
    }

    useEffect(() => {
        fetchEtudiants(props.sessionId);
    }, []);

    async function sendPresences(){
        let url = `${REACT_APP_API_URL}` + "/v1.0/session/miseajour/presence";
        let prez = listeEleves.map((eleve) => {
            return {
                ine: eleve.ine,
                presence: eleve.presence
            }
        })
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: props.sessionId,
                presence: prez
            })
        }).then(() => {
            fetchEtudiants(props.sessionId);
            //props.setDefaultPage(true);
            //navigation.goBack();
        });
    }

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

        findEleveByCodeEmargement(parsedRecords[0]);

        } else {
            console.log('No NDEF data found on the tag');
        }
      };
    
    const readNFC = async () => {
        try {
            await NfcManager.requestTechnology(NfcTech.Ndef);
            const tag = await NfcManager.getTag();
            ndefHandler(tag);
            NfcManager.cancelTechnologyRequest();
        } catch (error) {
            console.warn('Error reading NFC:', error);
        }
    };
    
    const startContinuousScan = async () => {
        setScanEnCours(true);
        const intervalId = setInterval(() => {
            readNFC();
        }, 500);
        setScanInterval(intervalId);
    };
    
    const stopContinuousScan = async () => {
        setScanEnCours(false);
        clearInterval(scanInterval);
        sendPresences();
    };

    return loaded ? (
        <View style={styles.emargementIntervenant} >
            <View>
            <ListeSessionsIntervenant sessions={[props.session]}/>
            </View>
            <View style={styles.button} >
                <BoutonEmargement startContinuousScan={startContinuousScan} stopContinuousScan={stopContinuousScan} scanEnCours={scanEnCours}/>
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
    spinner: {
        marginTop: 20,
    },
});