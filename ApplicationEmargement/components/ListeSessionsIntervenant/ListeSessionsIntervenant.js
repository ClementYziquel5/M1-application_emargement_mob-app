import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";

/*
 * Liste des sessions de l'intervenant
 * 
 * props:
 * - sessions: liste des sessions de l'intervenant
 * - setSessionId: fonction pour modifier l'id de la session en cours
 * - setSession: fonction pour modifier la session en cours
 * - setEmargementEnCours: fonction pour modifier l'état de l'émargement en cours
 * - emargementEnCours: état de l'émargement en cours
 */
export default function ListeSessionsIntervenant(props) {
    return (
        <ScrollView contentContainerStyle={styles.ScrollView}>            
            {props.sessions.map((session) => (
                <TouchableOpacity
                    key={session.id}
                    style={styles.session}
                    onPress={() =>{ // si l'émargement est en cours, on ne peut pas changer de session
                        !props.emargementEnCours && props.setSessionId(session.id);
                        !props.emargementEnCours && props.setSession([session]);
                        !props.emargementEnCours && props.setEmargementEnCours(true);
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
        borderColor: "rgba(68, 68, 68, 1)",
        borderWidth: 1,
    },
    matiere: {
        fontSize: 20,
        color: "white",
        margin: 4,
        fontFamily: "Cabin-Bold"
    },
    type: {
        fontSize: 15,
        color: "grey",
        fontFamily: "Cabin-Regular",
        margin: 4,
    },
    groupes: {
        fontSize: 15,
        color: "white",
        margin: 4,
        fontFamily: "Cabin-Bold"
    },
    heure: {
        fontSize: 15,
        color: "grey",
        margin: 4,
        fontFamily: "Comfortaa-Regular",
    },
    salles: {
        fontSize: 15,
        color: "grey",
        textAlign: "right",
        width: "100%",
        marginBottom: 4,
        fontFamily: "Comfortaa-Regular",
    },
    top: {
        flex: 1,
        flexDirection: "column",
        
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