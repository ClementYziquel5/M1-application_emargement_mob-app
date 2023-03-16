import React from "react";
import { Text, Dimensions, TouchableOpacity, View, StyleSheet } from "react-native";
import Svg, { RadialGradient, Stop, Circle } from 'react-native-svg';
 
export default function BoutonScanner(props){
    
    return(
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress = {() => console.log("Scanner")}
            >
                <Svg width="200" height="200">  
                    <RadialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <Stop offset="0" stopColor="rgb(255,255,255)" />
                        <Stop offset="0.7" stopColor="rgb(200,200,200)" />
                        <Stop offset="1" stopColor="rgb(150,150,150)" />
                    </RadialGradient>
                    <Circle cx="100" cy="100" r="100" fill="url(#grad)" />
                    <Text style={styles.buttonText}>SCANNER</Text>
                </Svg>
            </TouchableOpacity>
        </View>
        
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
});