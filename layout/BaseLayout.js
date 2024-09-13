import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ScrollView, StyleSheet, View } from "react-native";
import { useRef, useState } from "react";
import { Icon, Text } from "@rneui/themed";
import { TouchableOpacity } from "react-native";

// https://reactnavigation.org/docs/handling-safe-area
const BaseLayout = ({ navigation, children }) => {
    const insets = useSafeAreaInsets();

    //
    const scrollViewRef = useRef(null);
    const [showButton, setShowButton] = useState(false);

    const scrollToTop = () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    };

    const handleScroll = (event) => {
        const scrollY = event.nativeEvent.contentOffset.y; // Vị trí Y hiện tại khi cuộn
        if (scrollY > 300) {
            setShowButton(true);  // Hiển thị nút khi cuộn xuống dưới hơn 300px
        } else {
            setShowButton(false); // Ẩn nút khi cuộn về trên
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                onScroll={handleScroll}
                scrollEventThrottle={16} // Tốc độ sự kiện cuộn
                style={{
                    // Paddings to handle safe area
                    // paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                }}
                contentContainerStyle={{ flexGrow: 1 }}



            >
                {/* <Header navigation={navigation} /> */}
                {children}
                <Footer navigation={navigation} />
            </ScrollView>
            {showButton && (
                <TouchableOpacity style={styles.button} onPress={scrollToTop}>
                    <Icon type="antdesign" name="totop" size={24} color={'#fff'} />
                </TouchableOpacity>
            )}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 50,
        borderColor: '#fff',
        borderWidth: 1,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default BaseLayout;