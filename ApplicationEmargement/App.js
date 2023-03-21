import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, AppRegistry} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

AppRegistry.registerComponent(App, () => gestureHandlerRootHOC(App));

const Stack = createStackNavigator();

import Header from "./components/Header/Header";
import ListeSessionsIntervenant from "./components/ListeSessionsIntervenant/ListeSessionsIntervenant";
import EmargementEleve from "./components/EmargementEleve/EmargementEleve";
import ListeSessionsEleve from "./components/ListeSessionsEleve/ListeSessionsEleve";
import EmargementIntervenant from "./components/EmargementIntervenant/EmargementIntervenant";

export default function App() {
    const [isIntervenant, setIsIntervenant] = useState(true); // Pour l'instant en dur, true = intervenant, false = élève
    const [id, setId] = useState("4"); // Pour l'instant en dur (4 = LANGLAIS Sebastien) (081501761JL = LEROY Jacques)
    const [loaded, setLoaded] = useState(false); // Si les données ont été chargées
    const [sessions, setSessions] = useState([]); // Liste des sessions
    const [emargementEnCours, setEmargementEnCours] = useState(false); // Si un émargement est en cours
    const [sessionId, setSessionId] = useState(); // Id de la session en cours
    const [session, setSession] = useState([]); // Session en cours

    useEffect(() => {
        fetchSessions(id, isIntervenant,setLoaded,setSessions);
    }, []);

    return loaded 
    ? (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>
            </View>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        gestureEnabled: true,
                    }}
                >
                    {isIntervenant ? (
                        <>
                            <Stack.Screen
                                name="ListeSessionsIntervenant"
                                options={{ headerShown: false }}
                            >
                                {props => <ListeSessionsIntervenant {...props} sessions={sessions} />}
                            </Stack.Screen>
                            <Stack.Screen
                                name="EmargementIntervenant"
                                component={EmargementIntervenant}
                                options={{ headerShown: false }}
                            />
                        </>
                    ) : (
                        <>
                            <Stack.Screen
                                name="ListeSessionsEleve"
                                options={{ headerShown: false }}
                            >
                                {props => <ListeSessionsEleve {...props} sessions={sessions} />}
                            </Stack.Screen>
                            <Stack.Screen
                                name="EmargementEleve"
                                component={EmargementEleve}
                                options={{ headerShown: false }}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    ) : (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>
            </View>
            <Text style={styles.text}>Chargement...</Text>
            <ActivityIndicator size="large" color="#E20612" style={styles.spinner} />
        </View>
    );
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