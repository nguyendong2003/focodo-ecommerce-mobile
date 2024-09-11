import { Button, Image, Text } from "@rneui/themed";
import banner from '../assets/banner/1.png';
import { StyleSheet, View } from "react-native";

const BottomBanner = () => {
    return (
        <View style={styles.container}>
            <Image
                source={banner}
                style={styles.image}
            />
            <View
                style={styles.bannerContent}
            >
                <Text style={styles.bannerHeader}>Ưu đãi lớn</Text>
                <Text style={styles.bannerText}>Những ưu đãi tuyệt vời đến từ cửa hàng chúng tôi</Text>
                <Button
                    title="Mua ngay"
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
        </View>

    );
}

const styles = StyleSheet.create({
    bannerContent: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerHeader: {
        textAlign: 'center',
        fontSize: 48,
        fontWeight: 'semibold',
        color: '#fff',
    },
    bannerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'regular',
        color: '#fff',
    },
    container: {
        width: '100%',
        height: 360,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'center',
        objectFit: 'fill'
    },
});

export default BottomBanner;