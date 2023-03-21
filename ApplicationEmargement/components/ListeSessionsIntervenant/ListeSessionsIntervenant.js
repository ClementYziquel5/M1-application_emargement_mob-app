import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";

/*
 * Liste des sessions de l'intervenant
 * 
 * props:
 * - sessions: liste des sessions de l'intervenant
 * - setEmargementEnCours: fonction pour modifier l'état de l'émargement en cours
 * - emargementEnCours: état de l'émargement en cours
 */
export default function ListeSessionsIntervenant(props) {
    const { navigation } = props;

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
                        !props.emargementEnCours && props.setEmargementEnCours(true);
                        !props.emargementEnCours && navigation.navigate("EmargementIntervenant", { session: session, sessionId: session.id });
                    }}
                >
                    <View style={styles.top}>
                        <Text style={styles.matiere}>{session.matiere}</Text>
                        <Text style={styles.type}>{session.type}</Text>
                        <Text style={styles.groupes}>
                            {session.groupes.slice(0, -1).join(",  ")}  
                            {session.groupes.length > 1 ? ",  " : ""}
                            {session.groupes.slice(-1)}
                        </Text>
                        {/* Ce code utilise slice() pour récupérer tous les éléments de session.salles, sauf le dernier (on l'ajoute plus tard), et les concatène avec ",  " en utilisant join().
                        Ensuite, il vérifie si session.salles a plus d'un élément, et s'il en a, il ajoute ",  " pour séparer le dernier élément du reste.
                        Enfin, il ajoute le dernier élément de session.salles à la fin de la chaîne de caractères.*/}
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