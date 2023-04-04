import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {REACT_APP_API_URL} from "@env"
import { LogBox } from "react-native";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
LogBox.ignoreLogs(["Error reading NFC"]);
LogBox.ignoreLogs(["Can't perform a React state update on an unmounted component."]);
LogBox.ignoreLogs(["Non-serializable values were found in the navigation state."])


//AppRegistry.registerComponent(App, () => gestureHandlerRootHOC(App));

const Stack = createStackNavigator();

import Header from "./components/Header/Header";
import ListeSessions from "./components/ListeSessions/ListeSessions";
import EmargementEleve from "./components/EmargementEleve/EmargementEleve";
import EmargementIntervenant from "./components/EmargementIntervenant/EmargementIntervenant";
import EmargementContext from "./contexts/EmargementContext";

export default function App() {
    const [isConnected, setIsConnected] = useState(true); // Pour l'instant en dur
    const [defaultPage, setDefaultPage] = useState(true); // Si on est sur la page d'acceuil, true, sinon false, c'est pour gérer l'affichage de la flèche du header
    const [isIntervenant, setIsIntervenant] = useState(true); // Pour l'instant en dur, true = intervenant, false = élève
    const [id, setId] = useState("10"); // Pour l'instant en dur (4 = LANGLAIS Sebastien) (081501761JL = LEROY Jacques)
    const [loaded, setLoaded] = useState(false); // Si les données ont été chargées
    const [sessions, setSessions] = useState([]); // Liste des sessions
    const [emargementEnCours, setEmargementEnCours] = useState(false); // Si un émargement est en cours
    const [refreshing, setRefreshing] = useState(false);
    

    useEffect(() => {
        fetchSessions();
    }, []);

    async function onRefresh() {
        setRefreshing(true);
        setLoaded(false);
        await fetchSessions();
        setRefreshing(false);
    }
    

    async function fetchSessions() {
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

    return loaded ? (
        <EmargementContext.Provider value={{ emargementEnCours, setEmargementEnCours }}>
            <NavigationContainer theme={theme}>
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} contentContainerStyle={{marginTop:20}} />
                    }
                >
                    <Stack.Navigator
                        screenOptions={{
                        gestureEnabled: true,
                        header: (props) => <Header {...props} navigation={props.navigation} defaultPage={defaultPage} setDefaultPage={setDefaultPage}/>,
                        }}
                    >
                        {isIntervenant ? (
                        <>
                            <Stack.Screen
                            name="ListeSessionsIntervenant"
                            component={ListeSessions}
                            options={{ headerShown: true }}
                            initialParams={{
                                sessions: sessions,
                                isIntervenant: isIntervenant,
                            }}
                            />
                            <Stack.Screen
                            name="EmargementIntervenant"
                            component={EmargementIntervenant}
                            options={{ headerShown: true }}
                            initialParams={{
                                setDefaultPage: (bool) => {
                                    setDefaultPage(bool)
                                },
                            }}
                            />
                        </>
                        ) : (
                        <>
                            <Stack.Screen
                            name="ListeSessionsEleve"
                            component={ListeSessions}
                            options={{ headerShown: true }}
                            initialParams={{
                                sessions: sessions,
                                isIntervenant: isIntervenant,
                            }}
                            />
                            <Stack.Screen
                            name="EmargementEleve"
                            component={EmargementEleve}
                            options={{ headerShown: true }}
                            initialParams={{
                                ine: id,
                                setDefaultPage: (bool) => {
                                    setDefaultPage(bool)
                                },
                            }}
                            />
                        </>
                        )}
                    </Stack.Navigator>
                </ScrollView>
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
  