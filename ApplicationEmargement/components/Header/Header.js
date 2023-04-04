import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

/*
 * Header de l'application
 *
 * props: 
 * - defaultPage: booléen indiquant si la page est la page par défaut
 * - setDefaultPage: fonction pour remettre la page par défaut
 * - navigation: navigation
 */
export default function Header(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>
            {props.defaultPage ?                                //Si la page actuelle est la defaultPage (la defaultPage est la page d'émargement)
                       <TouchableOpacity
                       disabled={false}
                       onPressOut={() =>{                       //Lorsque l'on clique sur la flèche
                           if(props.defaultPage) {              //Si la page n'est pas la page par défaut
                               props.setDefaultPage(false);     //On remet la page par défaut
                               props.navigation.goBack();       //On revient à la page précédente
                           }
                       }}
                       >
                           <Image source={require('./arrow.png')} style={styles.arrow}/>
                       </TouchableOpacity>
            :
            null
            }

            <Image source={require('./logo.png')} style={styles.logo} />

            <TouchableOpacity
                onPressOut={() =>{
                    console.log("Click hamburger");
                }}
            >
                <Image source={require('./menu.png')} style={styles.menu} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: "20%",
    },
    arrow: {
        marginTop: 12,
        width: 22,
        height: 22,
    },
    logo: {
        width: 200,
        height: 50,
    },
    menu: {
        marginTop: 5,
        width: 35,
        height: 35,
    },
});