import React from "react";
import { Text, Dimensions, TouchableOpacity, TouchableHighlight, View, StyleSheet } from "react-native";
import Svg, { Rect, RadialGradient, Stop, Circle, Mask } from 'react-native-svg';

/*
 * Bouton pour scanner lancé par l'élève
 *
 * props:
 * - emargement: fonction pour lancer l'émargement
 * - setDemarrerEmargement: fonction pour modifier l'état de l'émargement en cours
 */
export default function BoutonScanner(props){
    return(
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.5}
                onPressOut= {() => {
                    console.log("Scanner ...");
                    // fonctions lorsque l'élève appuie sur le bouton scanner
                }}
            >
            <Svg width="200" height="200">  
                    <RadialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <Stop offset="0" stopColor="rgb(255,255,255)" />
                        <Stop offset="0.7" stopColor="rgb(200,200,200)" />
                        <Stop offset="1" stopColor="rgb(150,150,150)" />
                    </RadialGradient>
                    <Rect x="0" y="0" width="200" height="200" rx="100" fill="url(#grad)" />
                    <Text style={styles.buttonText}>SCANNER</Text>
                </Svg>
            </TouchableOpacity>
        </View>
        // <View style={styles.container}>
        //     <TouchableHighlight
        //         onPress={ () =>console.log("Scanner")}
        //         underlayColor="#bfbfbf"
        //     >
        //            <TouchableOpacity onPress={() => console.log('Scanner')}>
        //             <Svg height="200" width="200">
        //                 <Rect x="0" y="0" width="200" height="200" rx="100" fill="#F8F8F8" style={styles.rect}/>
        //             </Svg>
        //             </TouchableOpacity>
        //     </TouchableHighlight>
        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    buttonText: {
        color: "black",
        fontSize: 20,
        textAlign: "center",
        top: 90,
        fontFamily: "Roboto-Black",
    },
    text: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    rect: {
        
    },
});