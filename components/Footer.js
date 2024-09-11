import { Text, Icon } from '@rneui/themed';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';

const Footer = ({ navigation }) => {
    return (
        <View style={styles.footer}>
            <Icon type="antdesign" name="rocket1" color="#fff" />
            <Text style={styles.footerText}>Hệ thống quảng bá và kinh doanh đặc sản Huế</Text>

            {/*  */}
            <Text style={styles.footerSectionText}>Liên hệ</Text>
            <Text style={styles.footerText}>Địa chỉ: 43 CMT8 - Đà Nẵng</Text>
            <Text style={styles.footerText}>Email: Focodo43@gmail.com</Text>
            <Text style={styles.footerText}>Điện thoại: 0123456789</Text>

            {/*  */}
            <Text style={styles.footerSectionText}>Hướng dẫn</Text>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    // navigation.navigate('Home');
                    alert('Đặt hàng và mua hàng');
                }}
            >
                <Text style={styles.footerText}>Đặt hàng và mua hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    // navigation.navigate('Home');
                    alert('Thanh toán online');
                }}
            >
                <Text style={styles.footerText}>Thanh toán online</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    // navigation.navigate('Home');
                    alert('Chính sách giao hàng');
                }}
            >
                <Text style={styles.footerText}>Chính sách giao hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    // navigation.navigate('Home');
                    alert('Các câu hỏi thường gặp');
                }}
            >
                <Text style={styles.footerText}>Các câu hỏi thường gặp</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    // navigation.navigate('Home');
                    alert('Điều khoản sử dụng website')
                }}
            >
                <Text style={styles.footerText}>Điều khoản sử dụng website</Text>
            </TouchableOpacity>
            {/*  */}

            <View style={styles.socialMedia}>
                <Icon type="antdesign" name="twitter" color="#fff" onPress={() => Linking.openURL('https://twitter.com')} />
                <Icon type="antdesign" name="facebook-square" color="#fff" onPress={() => Linking.openURL('https://facebook.com')} />
                <Icon type="font-awesome-5" name="tiktok" color="#fff" onPress={() => Linking.openURL('https://tiktok.com')} />
                <Icon type="antdesign" name="instagram" color="#fff" onPress={() => Linking.openURL('https://instagram.com')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#000',
        padding: 20,
    },
    footerSectionText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        paddingTop: 28,
        paddingBottom: 8
    },
    footerText: {
        color: '#CFCFCF',
        fontSize: 14,
        textAlign: 'center',
        paddingVertical: 12
    },
    socialMedia: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        marginVertical: 28
    }
})

export default Footer;