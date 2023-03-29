import React, { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import {REACT_APP_API_URL} from "@env"
import NfcManager, {Ndef, NfcEvents} from 'react-native-nfc-manager';


import BoutonScanner from "../BoutonScanner/BoutonScanner";
import ListeSessionsEleve from "../ListeSessionsEleve/ListeSessionsEleve";
import EmargementContext from "../../contexts/EmargementContext";
import { HCESession, NFCTagType4NDEFContentType, NFCTagType4 } from 'react-native-hce';
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

    const [hasNfc, setHasNFC ] = useState(null);

    const [scanEnCours, setScanEnCours] = useState(false);
    const [codeEmargement, setCodeEmargement] = useState(false);
    const { emargementEnCours, setEmargementEnCours } = useContext(EmargementContext);
    const [loaded, setLoaded] = useState(false);

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
        if(scanEnCours) { // Si on arrête le scan
            stopSession();
            setScanEnCours(false);
            console.log("Scan arrêté");
        }else { // Si on démarre le scan
            startSession();
            setScanEnCours(true);
            console.log("Scan démarré");
        }
    }

    const startSession = async () => {
        const tag = new NFCTagType4({
          type: NFCTagType4NDEFContentType.Text,
          content: codeEmargement,
          writable: false
        });
      
        session = await HCESession.getInstance();
        session.setApplication(tag);
        await session.setEnabled(true);
    }
    
    const stopSession = async () => {
        await session.setEnabled(false);
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
            setLoaded(true);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        const checkIsSupported = async () => {
          const deviceIsSupported = await NfcManager.isSupported()
    
          setHasNFC(deviceIsSupported)
          if (deviceIsSupported) {
            console.log("NFC Supported");
            await NfcManager.start()
            console.log("NFC Started");
          } else {
            console.log("NFC Not Supported");
          }
        }
    
        checkIsSupported()
    }, [])

    useEffect(() => {
        console.log('Starting nfcEventListener')
        NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
            console.log('tag found')
        })

        return () => {
            NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        }
    }, [])
    
    
    const readTag = async () => {
        console.log("Reading");
        await NfcManager.registerTagEvent();
    }

    // Gérer tout l'émargement ici
    async function emargement() {
        setScanEnCours(!scanEnCours);
        
        await NfcManager.start()
        .then(() => console.log('NFC démarré'))
        .catch((err) => console.warn('Erreur lors du démarrage de l\'écoute NFC', err));
    
        if (codeEmargement) {
            const message = Ndef.encodeMessage([Ndef.textRecord(codeEmargement)]);
            NfcManager.setNdefPushMessage(message)
                .then(() => console.log('Prêt à partager le code d\'émargement'))
                .catch((err) => console.warn('Erreur lors de la configuration du partage NFC', err));
        }
        return () => {
            NfcManager.setNdefPushMessage(null);
        };
    }

    return loaded ? (
        <View style={styles.emargementEleve} >
            <View>
                <ListeSessionsEleve sessions={[props.session]} emargementEnCours={props.emargementEnCours}/>
            </View>
            <Text style={styles.text}>Émargement</Text>
            <View style={styles.button} >
                <BoutonScanner emargement={emargement} />
            </View>
            <View style={styles.codeEmargement} >
                <Text style={styles.text}>Code d'émargement: {codeEmargement}</Text>
            </View>
            <Text>Hello world</Text>
            <TouchableOpacity style={[styles.btn, styles.btnScan]} onPress={readTag}>
                <Text style={{ color: "white" }}>Scan Tag</Text>
            </TouchableOpacity>
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