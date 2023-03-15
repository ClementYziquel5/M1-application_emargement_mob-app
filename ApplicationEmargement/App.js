import React, {} from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "./components/Header/Header";
import ListeSessionsIntervenant from "./components/ListeSessionsIntervenant/ListeSessionsIntervenant";

export default function App() {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.liste}>
                <ListeSessionsIntervenant />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#18171E",
        paddingBottom: 50,
    },
    liste: {
        marginTop: 40,
    },
});