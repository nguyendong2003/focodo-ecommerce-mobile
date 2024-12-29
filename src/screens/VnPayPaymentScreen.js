import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform, Linking, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { API_EXPO } from '../services/api-config';
import { callGetPayment } from '../services/api';
import { AuthContext } from '../components/context/AuthProvider';
import Toast from 'react-native-toast-message';

const VnPayPaymentScreen = ({ navigation, route }) => {
    const { userLogin, setUserLogin, login, logout, fetchAccount } = useContext(AuthContext)
    const { customer, order, paymentUrl } = route.params;
    // State to prevent multiple navigation or error handling
    const [isHandled, setIsHandled] = useState(false);

    console.log("=======================");
    console.log('VNPayPaymentScreen: ', { customer, order, paymentUrl });

    const handleNavigationChange = async (navState) => {
        if (isHandled) return;

        const { url } = navState;

        if (url.includes('vnp_ResponseCode')) {
            const updatedUrl = url.replace('localhost', API_EXPO);
            console.log('Updated URL: ', updatedUrl);

            const res = await callGetPayment(updatedUrl);

            if (res && res.result) {
                if (res.result.code === "00") {
                    navigation.navigate('OrderSuccess', {
                        customer,
                        order: {
                            ...order,
                            id_order: res.result.id_order
                        }
                    });

                    await fetchAccount();

                    setIsHandled(true);
                }
            } else {
                setIsHandled(true);
                navigation.goBack();
                Toast.show({
                    type: 'error',
                    text1: 'Thất bại',
                    text2: 'Thanh toán thất bại. Vui lòng thử lại',
                });
            }
        }
    };

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: paymentUrl }}
                onNavigationStateChange={handleNavigationChange}
                startInLoadingState={true}
                renderLoading={() => (
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
                )}
                onShouldStartLoadWithRequest={(request) => {
                    if (isHandled) return false;

                    return true; // Cho phép tiếp tục tải
                }}
                onError={(e) => {
                    let insecureHosts = [-1004, -6, -1202]; // Lỗi kết nối thường gặp
                    if (e) {
                        // Xử lý lỗi kết nối
                        if (insecureHosts.indexOf(e.nativeEvent.code) !== -1) {
                            setIsHandled(true);
                        }
                        // Lỗi phân giải tên miền
                        else if (e.nativeEvent.code === -1003 || e.nativeEvent.code === -2) {
                            setIsHandled(true);
                        }
                    } else {
                        // Nếu không bắt được lỗi, hiển thị thông báo lỗi chung
                        return (<View>
                            <Text>Error occurred while loading the page.</Text>
                        </View>);
                    }
                }}
                renderError={(e) => {
                    return (
                        <View>
                            <ActivityIndicator
                                animating={true}
                                color='#84888d'
                                size='large'
                                hidesWhenStopped={true}
                                style={{ alignItems: 'center', justifyContent: 'center', padding: 30, flex: 1 }} />
                        </View>
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loading: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
});

export default VnPayPaymentScreen;
