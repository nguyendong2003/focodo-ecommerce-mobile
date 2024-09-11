import { Button, Image, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

const ContentBanner = () => {
    return (
        <View style={styles.content}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.brandText}>FoCoDo</Text>
            <Text style={styles.sloganText}>Món ăn đặc trưng mang hương vị Huế</Text>
            <Button
                title="Mua sắm nào"
                buttonStyle={{
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#fff',
                }}
                containerStyle={{
                    width: 160,
                    marginHorizontal: 50,
                    marginVertical: 20,
                }}
            />
        </View>
    )
}

const ImageBanner = () => {
    return (
        <Image
            source={require('../assets/banner.png')}
            style={{
                width: '100%',
                height: 430
            }}
        />
    )
}

const Banner = () => {
    return (
        <View style={styles.container}>
            <ContentBanner />
            <ImageBanner />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    welcomeText: {
        fontSize: 24,
        color: '#fff',
        opacity: 0.3,
    },
    brandText: {
        fontSize: 72,
        color: '#fff',
        fontWeight: 'bold',
    },
    sloganText: {
        fontSize: 18,
        color: '#909090',
    }

})

export default Banner;