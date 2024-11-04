import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Platform, View, TouchableOpacity, Modal, ActivityIndicator, Alert, TextInput } from 'react-native';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { callVerifyEmail, callVerifyOtp } from '../services/api';

const styles = StyleSheet.create({
    root: { flex: 1, padding: 20, backgroundColor: 'white' },
    title: { textAlign: 'center', fontSize: 20 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
    timerText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
        color: 'red',
    },
    resendButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007bff',
        alignItems: 'center',
        borderRadius: 5,
    },
    resendButtonText: {
        color: 'white',
        fontSize: 16,
    },
    verifyButton: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#007bff',
        alignItems: 'center',
        borderRadius: 5,
    },
    verifyButtonDisabled: {
        backgroundColor: '#cccccc',
    },
    verifyButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

const CELL_COUNT = 6;

const ForgotEnterOTPScreen = ({ navigation, route }) => {
    const { email } = route.params;
    const [value, setValue] = useState('');
    const [timer, setTimer] = useState(60); // Đặt thời gian ban đầu là 60 giây
    const [showResendButton, setShowResendButton] = useState(false); // Theo dõi khi nào hết thời gian
    const [loading, setLoading] = useState(false); // Trạng thái để điều khiển Modal
    const [disabled, setDisabled] = useState(true);

    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useEffect(() => {
        if (value.length === CELL_COUNT) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [value]);

    useEffect(() => {
        // Khởi chạy bộ đếm ngược
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 1) {
                    clearInterval(interval); // Ngừng đếm khi hết 60 giây
                    setShowResendButton(true); // Hiển thị nút gửi lại mã
                }
                return prevTimer - 1;
            });
        }, 1000);

        // Xóa bộ đếm khi component bị unmounted
        return () => clearInterval(interval);
    }, [timer]);

    // Hàm gửi lại mã OTP
    const handleResendOTP = async () => {
        setLoading(true); // Hiển thị modal khi đang gửi lại mã OTP
        try {
            const res = await callVerifyEmail(email);  // Gọi API gửi lại mã OTP
            setLoading(false);

            if (res && res.result) {
                setTimer(60); // Reset lại bộ đếm thời gian
                setValue('')
                setShowResendButton(false); // Ẩn nút gửi lại mã
                Alert.alert('Thành công', 'Mã OTP đã được gửi lại');
            } else {
                Alert.alert('Lỗi', 'Có lỗi xảy ra khi gửi lại mã OTP');
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi gửi lại mã OTP');
        }
    };

    const handleVerifyOTP = async () => {
        setLoading(true); // Hiển thị modal khi xác thực OTP
        try {
            const res = await callVerifyOtp(email, value);  // Gọi API verify OTP
            setLoading(false);

            console.log('Response verify OTP:', res);


            if (res && res.result) {
                Alert.alert('Thành công', 'OTP hợp lệ!');
                navigation.navigate('ForgotEnterPassword', { email });  // Chuyển qua màn hình đặt mật khẩu mới
            } else {
                Alert.alert('Lỗi', 'Mã OTP không đúng');
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi xác thực OTP');
        }
    };

    return (
        <SafeAreaView style={styles.root}>
            {
                showResendButton ? (
                    <>
                        <Text style={styles.title}>Mã OTP đã hết hạn</Text>
                        <TouchableOpacity style={styles.resendButton} activeOpacity={0.7} onPress={handleResendOTP}>
                            <Text style={styles.resendButtonText}>Gửi lại mã OTP</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={styles.title}>Nhập OTP gửi trong email</Text>
                        <Text style={styles.timerText}>Mã OTP sẽ hết hạn trong: {timer} giây</Text>
                        <CodeField
                            ref={ref}
                            {...props}
                            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                            value={value}
                            onChangeText={setValue}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
                            testID="my-code-input"
                            renderCell={({ index, symbol, isFocused }) => (
                                <Text
                                    key={index}
                                    style={[styles.cell, isFocused && styles.focusCell]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            )}
                        />
                        <TouchableOpacity
                            style={[styles.verifyButton, disabled && styles.verifyButtonDisabled]}  // Nút để verify OTP
                            activeOpacity={0.7}
                            onPress={handleVerifyOTP}
                            disabled={disabled}
                        >
                            <Text style={styles.verifyButtonText}>Xác thực OTP</Text>
                        </TouchableOpacity>
                    </>
                )
            }

            <Modal
                transparent={true}
                visible={loading}
                animationType="none"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default ForgotEnterOTPScreen;