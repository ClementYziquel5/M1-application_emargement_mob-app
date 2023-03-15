import React, {} from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "./components/Header/Header";

export default function App() {
    return (
        <View style={styles.container}>
            <Header />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1D1F31",
    },
    header: {
        flex: 1,
    },
});