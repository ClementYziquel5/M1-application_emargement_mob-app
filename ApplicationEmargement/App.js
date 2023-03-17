import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

import Header from "./components/Header/Header";
import ListeSessionsIntervenant from "./components/ListeSessionsIntervenant/ListeSessionsIntervenant";
import ListeEleves from "./components/ListeEleves/ListeEleves";
import BoutonEmargement from "./components/BoutonEmargement/BoutonEmargement";
import EmargementEleve from "./components/EmargementEleve/EmargementEleve";

export default function App() {
    const [isIntervenant, setIsIntervenant] = useState(true);
    const [id, setId] = useState("4");
    const [loaded, setLoaded] = useState(false);
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        fetchSessions(id, isIntervenant,setLoaded,setSessions);
    }, []);

    return loaded 
    ?(
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>
            </View>
            {/* <EmargementEleve/> */}
            <ListeSessionsIntervenant sessions={sessions} />
        </View>
    )
    :(
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>
            </View>
            <Text style={styles.text}>Chargement...</Text>
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
    console.log(url);
    return fetch(url)
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        setSessions(json);
        setLoaded(true);
    })
    .catch((error) => {
        console.error(error);
    });
}

function emargementProf(sessions) {
    const [emargementEnCours, setEmargementEnCours] = useState(false);

    // Gérer tout l'émargement ici
    function emargement() {
        setEmargementEnCours(!emargementEnCours);
    }

    return (
        <View style={styles.emargementProf} >
            <View>
                <ListeSessionsIntervenant nombre="1"/>
            </View>
            <View style={styles.button} >
                <BoutonEmargement emargement={emargement} emargementEnCours={emargementEnCours} />
            </View>
            <ScrollView>
                <ListeEleves nombre="30"/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#18171E",
    },
    emargementProf: {

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
});