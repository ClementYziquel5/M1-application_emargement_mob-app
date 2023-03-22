import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default function Header() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>

            

            <View style={styles.hamburgerMenu}>
                <Text>Yohann LE CAM</Text>
            </View>
            <TouchableOpacity
                onPressOut={() =>{
                    console.log("Click back");
                }}
            >
                <Image source={require('./arrow.png')} style={styles.arrow} />
            </TouchableOpacity>

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