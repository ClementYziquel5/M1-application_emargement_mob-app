import React, {useState} from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import Header from "./components/Header/Header";
import ListeSessionsIntervenant from "./components/ListeSessionsIntervenant/ListeSessionsIntervenant";
import ListeEleves from "./components/ListeEleves/ListeEleves";
import BoutonEmargement from "./components/BoutonEmargement/BoutonEmargement";

export default function App() {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>
            </View>
            {emargementProf()}
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
        <View style={styles.container} >
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
    header: {
        marginBottom: 50,
    },
});