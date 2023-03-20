import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from "react-native";

import Header from "./components/Header/Header";
import ListeSessionsIntervenant from "./components/ListeSessionsIntervenant/ListeSessionsIntervenant";
import EmargementEleve from "./components/EmargementEleve/EmargementEleve";
import ListeSessionsEleve from "./components/ListeSessionsEleve/ListeSessionsEleve";
import EmargementIntervenant from "./components/EmargementIntervenant/EmargementIntervenant";

export default function App() {
    const [isIntervenant, setIsIntervenant] = useState(true); // Pour l'instant en dur, true = intervenant, false = élève
    const [id, setId] = useState("4"); // Pour l'instant en dur (4 = LANGLAIS Sebastien) (081501761JL = LEROY Jacques)
    const [loaded, setLoaded] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [emargementEnCours, setEmargementEnCours] = useState(false);
    const [sessionId, setSessionId] = useState();
    const [session, setSession] = useState([]);
    const [wait, setWait] = useState(false);

    useEffect(() => {
        fetchSessions(id, isIntervenant,setLoaded,setSessions);
    }, []);

    return loaded 
    ?(
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>
            </View>
            {isIntervenant ? // Si l'utilisateur est un intervenant
                emargementEnCours ? // Si un émargement est en cours
                    <EmargementIntervenant sessionId={sessionId} session={session}/> // Afficher l'émargement
                : // Sinon
                    <ListeSessionsIntervenant sessions={sessions} setSession={setSession} setSessionId={setSessionId} setEmargementEnCours={setEmargementEnCours}/> // Afficher la liste des sessions
            : // Sinon (l'utilisateur est un élève)
                emargementEnCours ? // Si un émargement est en cours
                    <EmargementEleve sessionId={sessionId} session={session}/> // Afficher l'émargement
                : // Sinon
                    <ListeSessionsEleve sessions={sessions} setSession={setSession} setSessionId={setSessionId} setEmargementEnCours={setEmargementEnCours}/> // Afficher la liste des sessions
            }
        </View>
    )
    :(
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>
            </View>
            <Text style={styles.text}>Chargement...</Text>
            <ActivityIndicator size="large" color="#E20612" style={styles.spinner} />
        </View>
    )
    ;
}

async function fetchSessions(id, isIntervenant,setLoaded,setSessions) {
    let url = "";
    if(isIntervenant) {
        url = process.env.REACT_APP_API_URL+ "/v1.0/session/intervenant/" + id;
    } else {
        url = process.env.REACT_APP_API_URL+ "/v1.0/session/etudiant/" + id;
    }
    return fetch(url)
    .then((response) => response.json())
    .then((json) => {
        setSessions(json);
        setLoaded(true);
    })
    .catch((error) => {
        console.error(error);
    });
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#18171E",
    },
    header: {
        marginBottom: 50,
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