import { Button } from '@rneui/themed'
import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
// https://blog.logrocket.com/implement-react-native-snap-carousel/
export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = SLIDER_WIDTH

const CarouselCardItem = ({ item, index }) => {
    return (
        <View style={styles.container} key={index}>
            <Image
                source={{ uri: item.imgUrl }}
                style={styles.image}
            />
            <Text style={styles.header}>{item.name}</Text>
            <Text style={styles.body}>{item.description}</Text>
            <Button
                type='outline'
                title="Mua ngay"
                buttonStyle={{
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: '#000',
                }}
                titleStyle={{
                    color: '#000',
                }}
                containerStyle={{
                    width: 160,
                    alignSelf: 'center',
                    marginTop: 20
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        width: ITEM_WIDTH,
        paddingBottom: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    image: {
        width: ITEM_WIDTH,
        height: 300,
    },
    header: {
        color: "#222",
        fontSize: 28,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingTop: 20
    },
    body: {
        color: "#222",
        fontSize: 18,
        paddingLeft: 20,
        paddingLeft: 20,
        paddingRight: 20
    }
})

export default CarouselCardItem