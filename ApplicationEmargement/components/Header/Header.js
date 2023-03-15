import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

export default function Header() {
    return (
        <View style={styles.container}>
            <Image source={require('./logo.png')} style={styles.logo} />
            <Image source={require('./menu.png')} style={styles.menu} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logo: {
        width: 200,
        height: 50,
    },
    menu: {
        width: 40,
        height: 40,
    },
});