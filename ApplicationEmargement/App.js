import React, {useState} from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

import Header from "./components/Header/Header";
import ListeSessionsIntervenant from "./components/ListeSessionsIntervenant/ListeSessionsIntervenant";
import ListeEleves from "./components/ListeEleves/ListeEleves";
import BoutonEmargement from "./components/BoutonEmargement/BoutonEmargement";
import BoutonScanner from "./components/BoutonScanner/BoutonScanner";

export default function App() {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>
            </View>
            {emargementEleve()}
        </View>
    );
}

function emargementProf() {
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

function emargementEleve() {
    return (
        <View style={styles.emargementEleve} >
            <Text style={styles.text}>Emargement</Text>
            <View style={styles.button} >
                <BoutonScanner />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#18171E",
        height: "100%",
    },
    emargementProf: {

    },
    emargementEleve: {
        flex: 1,
        flexDirection: "column",
    },
    header: {
        marginBottom: 50,
    },
    text: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
});