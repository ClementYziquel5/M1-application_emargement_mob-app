import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, AppRegistry} from "react-native";
import { NavigationContainer, DefaultTheme , ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {REACT_APP_API_URL} from "@env"
import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import { LogBox } from "react-native";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);


//AppRegistry.registerComponent(App, () => gestureHandlerRootHOC(App));

const Stack = createStackNavigator();

import Header from "./components/Header/Header";
import ListeSessionsIntervenant from "./components/ListeSessionsIntervenant/ListeSessionsIntervenant";
import EmargementEleve from "./components/EmargementEleve/EmargementEleve";
import ListeSessionsEleve from "./components/ListeSessionsEleve/ListeSessionsEleve";
import EmargementIntervenant from "./components/EmargementIntervenant/EmargementIntervenant";
import EmargementContext from "./contexts/EmargementContext";

export default function App() {
    const [isConnected, setIsConnected] = useState(true); // Pour l'instant en dur
    const [isIntervenant, setIsIntervenant] = useState(true); // Pour l'instant en dur, true = intervenant, false = élève
    const [id, setId] = useState("4"); // Pour l'instant en dur (4 = LANGLAIS Sebastien) (081501761JL = LEROY Jacques)
    const [loaded, setLoaded] = useState(false); // Si les données ont été chargées
    const [sessions, setSessions] = useState([]); // Liste des sessions
    const [emargementEnCours, setEmargementEnCours] = useState(false); // Si un émargement est en cours

    useEffect(() => {
        fetchSessions(id, isIntervenant,setLoaded,setSessions);
    }, []);

    return loaded ? (
        <EmargementContext.Provider value={{ emargementEnCours, setEmargementEnCours }}>
            <NavigationContainer theme={theme}>
                <Stack.Navigator
                    screenOptions={{
                    gestureEnabled: true,
                    header: (props) => <Header {...props} />,
                    }}
                >
                    {isIntervenant ? (
                    <>
                        <Stack.Screen
                        name="ListeSessionsIntervenant"
                        component={ListeSessionsIntervenant}
                        options={{ headerShown: true }}
                        initialParams={{
                            sessions: sessions,
                        }}
                        />
                        <Stack.Screen
                        name="EmargementIntervenant"
                        component={EmargementIntervenant}
                        options={{ headerShown: true }}
                        />
                    </>
                    ) : (
                    <>
                        <Stack.Screen
                        name="ListeSessionsEleve"
                        component={ListeSessionsEleve}
                        options={{ headerShown: true }}
                        initialParams={{
                            sessions: sessions,
                        }}
                        />
                        <Stack.Screen
                        name="EmargementEleve"
                        component={EmargementEleve}
                        options={{ headerShown: true }}
                        initialParams={{ ine: id }}
                        />
                    </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </EmargementContext.Provider>
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
        url = `${REACT_APP_API_URL}` + "/v1.0/session/intervenant/" + id;
    } else {
        url = `${REACT_APP_API_URL}` + "/v1.0/session/etudiant/" + id;
    }
    try {
        const response = await fetch(url);
        const json = await response.json();
        setSessions(json);
        setLoaded(true);
    } catch (error) {
        console.error(error);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#18171E",
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

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#18171E',
    },
  };
  