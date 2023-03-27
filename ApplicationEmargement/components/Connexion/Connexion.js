import React, { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

export default function EmargementEleve(props) {
  

    return (
        <View >
            <View>
                <Text>Test</Text>
            </View>
        </View>
        )
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