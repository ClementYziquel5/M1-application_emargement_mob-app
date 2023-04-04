import React, {useContext} from "react";
import { StyleSheet, TouchableOpacity, Text, View, ScrollView } from "react-native";
import EmargementContext from "../../contexts/EmargementContext";

/*
 * Liste des sessions de l'élève
 * 
 * props:
 * - navigation: navigation
 * 
 * props.route.params:
 * - sessions: liste des sessions de l'élève
 * - isIntervenant: booléen indiquant si l'utilisateur est un intervenant
 */
export default function ListeSessions(props) {
    const { navigation } = props;
    const { emargementEnCours, setEmargementEnCours } = useContext(EmargementContext);

    // Vérifie si props.route.params est défini, sinon utilisez les props directement
    if (props.route && props.route.params && props.route.params.sessions) {
        props = props.route.params;
    }

    return props.sessions && ( 
        <ScrollView contentContainerStyle={styles.ScrollView}>            
            {props.sessions.map((session) => (
                <TouchableOpacity
                    key={session.id}
                    style={styles.session}
                    onPress={() =>{ // si l'émargement est en cours, on ne peut pas changer de session
                        !emargementEnCours && setEmargementEnCours(true);
                        {props.isIntervenant ?
                            !emargementEnCours && navigation.navigate("EmargementIntervenant", { session: session, sessionId: session.id }
                            ) :
                            !emargementEnCours && navigation.navigate("EmargementEleve", { session: session, sessionId: session.id })
                        }
                    }}
                >
                    <View style={styles.top}>
                        <Text style={styles.matiere}>{session.matiere}</Text>
                        <Text style={styles.type}>{session.type}</Text>
                        {props.isIntervenant ? 
                        (
                            <Text style={styles.groupes}>
                                {session.groupes.slice(0, -1).join(",  ")}  
                                {session.groupes.length > 1 ? ",  " : ""}
                                {session.groupes.slice(-1)}
                            </Text>                       
                        ) : (
                            <Text style={styles.profs}>
                                {session.intervenants.slice(0, -1).join(", ")}
                                {session.intervenants.length > 1 ? ", " : ""}
                                {session.intervenants.slice(-1)}
                            </Text>                        
                        )}
                    </View>
                    <View style={styles.bottom}>
                        <View style={styles.gauche}>
                            <Text style={styles.heure}>{session.heureDebut} - {session.heureFin}</Text>
                        </View>
                        <View style={styles.droite}>
                            <Text style={styles.salles}>
                                {session.salles.slice(0, -1).join(", ")}
                                {session.salles.length > 1 ? ", " : ""}
                                {session.salles.slice(-1)}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const fontSizeRef = 15;

const styles = StyleSheet.create({
    ScrollView: {
        alignItems: "center",
    },
    session: {
        width: "85%",
        backgroundColor: "rgba(29, 31, 49, 1)",
        borderRadius: 15,
        margin: 10,
        padding: 10,
        overflow: "hidden",
        flexDirection: "column",
        borderColor: "rgba(68, 68, 68, 0.72)",
        borderWidth: 1,
    },
    matiere: {
        fontSize: fontSizeRef + 5,
        color: "white",
        fontFamily: "Cabin-Bold",
        marginLeft: 4,
        marginTop: 0,
        marginBottom: 0,
    },
    type: {
        fontSize: fontSizeRef - 1,
        color: "grey",
        fontFamily: "Cabin-Regular",
        marginLeft: 4,
        marginTop: 0,
        marginBottom: 5,
    },
    profs: {
        fontSize: fontSizeRef + 0,
        color: "white",
        fontFamily: "Cabin-Bold",
        marginLeft: 4,
        marginTop: 5,
        marginBottom: 4,
        width: "70%",
    },
    groupes: {
        fontSize: fontSizeRef + 0,
        color: "white",
        fontFamily: "Cabin-Bold",
        marginLeft: 4,
        marginTop: 5,
        marginBottom: 4,
        width: "70%",
    },
    heure: {
        fontSize: fontSizeRef - 1,
        color: "grey",
        fontFamily: "Cabin-Regular",
        marginLeft: 4,
    },
    salles: {
        fontSize: fontSizeRef - 1,
        color: "grey",
        textAlign: "right",
        width: "100%",
        fontFamily: "Cabin-Regular",
        marginLeft: 4,
    },
    top: {
        flex: 1,
        flexDirection: "column",
        marginBottom: 5,
        
    },
    bottom: {
        flex: 1,
        flexDirection: "row",
    },
    droite: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-end",
    },
    gauche: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
    },
});